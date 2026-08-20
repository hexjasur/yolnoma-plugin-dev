import path from 'path';
import fs from 'fs';
import { buildPluginCommand } from './build.js';
import { copyPluginArtifactToAppData } from './install.js';
import { loadYolnomaConfig, type YolnomaConfig } from '../config/loader.js';
import { logger } from '../utils/logger.js';

export interface DevCommandOptions {
  readonly debounceMs?: number;
}

/**
 * Starts the live development watcher for a Yolnoma plugin project.
 * Automatically rebuilds and updates the AppData plugin bundle whenever source files change.
 */
export async function devPluginCommand(
  targetDir = process.cwd(),
  options: DevCommandOptions = {}
): Promise<void> {
  const projectDir = path.resolve(targetDir);
  const debounceMs = options.debounceMs ?? 200;

  logger.raw(`\n\x1b[1mStarting Yolnoma plugin development mode in\x1b[0m \x1b[36m${projectDir}\x1b[0m...\n`);

  // 1. Validate configuration
  let config: YolnomaConfig;
  try {
    config = await loadYolnomaConfig(projectDir);
    logger.step(`Configuration found: \x1b[32m${config.name}\x1b[0m (\x1b[2m${config.id}\x1b[0m)`);
  } catch (err) {
    logger.error(err instanceof Error ? err.message : String(err));
    process.exitCode = 1;
    return;
  }

  // 2. Initial build and install to AppData
  try {
    const buildOk = await buildPluginCommand(projectDir, { silent: true });
    if (!buildOk) {
      logger.error('Initial build failed. Please fix the errors above.');
      process.exitCode = 1;
      return;
    }
    logger.step('Initial build completed: \x1b[32mdist/plugin.js\x1b[0m');

    const { destinationDir, sizeKb } = copyPluginArtifactToAppData(projectDir, config.id);
    logger.step(`Plugin installed to AppData (\x1b[36m${sizeKb} KB\x1b[0m):\n    \x1b[2m${destinationDir}\x1b[0m`);
  } catch (err) {
    logger.error(`Initial setup failed: ${err instanceof Error ? err.message : String(err)}`);
    process.exitCode = 1;
    return;
  }

  logger.raw(`\n\x1b[36mℹ\x1b[0m Watching plugin source for changes... \x1b[2m(Press Ctrl+C to stop)\x1b[0m\n`);

  // 3. Watch files in project
  let isBuilding = false;
  let pendingRebuild = false;
  let debounceTimer: NodeJS.Timeout | null = null;
  let lastChangedFile = '';

  const doRebuild = async (changedFile: string) => {
    if (isBuilding) {
      pendingRebuild = true;
      return;
    }

    isBuilding = true;
    const relChanged = path.relative(projectDir, changedFile) || changedFile;
    logger.raw(`\x1b[36mℹ Change detected:\x1b[0m \x1b[1m${relChanged}\x1b[0m`);

    const startTime = Date.now();

    try {
      // Re-read config if yolnoma.config.* changed
      if (changedFile.includes('yolnoma.config')) {
        try {
          config = await loadYolnomaConfig(projectDir);
          logger.step(`Configuration reloaded: \x1b[32m${config.name}\x1b[0m`);
        } catch (cfgErr) {
          logger.error(`Failed to reload configuration: ${cfgErr instanceof Error ? cfgErr.message : String(cfgErr)}`);
        }
      }

      const buildOk = await buildPluginCommand(projectDir, { silent: true });
      if (!buildOk) {
        logger.warn('Build failed. Waiting for changes to retry...\n');
        isBuilding = false;
        return;
      }

      const duration = Date.now() - startTime;
      const { sizeKb } = copyPluginArtifactToAppData(projectDir, config.id);
      logger.step(`Plugin rebuilt in \x1b[36m${duration}ms\x1b[0m (\x1b[36m${sizeKb} KB\x1b[0m)`);
      logger.step(`AppData plugin updated: \x1b[32m%LOCALAPPDATA%\\Yolnoma\\plugins\\${config.id}\\plugin.js\x1b[0m\n`);
    } catch (err) {
      logger.error(`Rebuild error: ${err instanceof Error ? err.message : String(err)}`);
      logger.raw(`\x1b[36mℹ\x1b[0m Watching for changes...\n`);
    } finally {
      isBuilding = false;
      if (pendingRebuild) {
        pendingRebuild = false;
        scheduleRebuild(lastChangedFile);
      }
    }
  };

  const scheduleRebuild = (filePath: string) => {
    lastChangedFile = filePath;
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    debounceTimer = setTimeout(() => {
      debounceTimer = null;
      doRebuild(filePath);
    }, debounceMs);
  };

  // Watch filter
  const shouldIgnore = (filename: string | null): boolean => {
    if (!filename) return true;
    const normalized = filename.replace(/\\/g, '/');
    return (
      normalized.startsWith('dist') ||
      normalized.startsWith('node_modules') ||
      normalized.startsWith('.git') ||
      normalized.includes('/dist/') ||
      normalized.includes('/node_modules/') ||
      normalized.endsWith('.tmp') ||
      normalized.endsWith('.tsbuildinfo') ||
      normalized.endsWith('~')
    );
  };

  let watcher: fs.FSWatcher | null = null;

  try {
    watcher = fs.watch(projectDir, { recursive: true }, (eventType, filename) => {
      if (!filename || shouldIgnore(filename)) {
        return;
      }
      const fullPath = path.join(projectDir, filename);
      scheduleRebuild(fullPath);
    });
  } catch (watchErr) {
    logger.error(`Failed to initialize file watcher: ${watchErr instanceof Error ? watchErr.message : String(watchErr)}`);
    process.exitCode = 1;
    return;
  }

  // Handle clean shutdown on SIGINT / SIGTERM
  const handleExit = () => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
      debounceTimer = null;
    }
    if (watcher) {
      watcher.close();
      watcher = null;
    }
    logger.raw('\n\x1b[36mℹ\x1b[0m Plugin development mode stopped.\n');
    process.exit(0);
  };

  process.on('SIGINT', handleExit);
  process.on('SIGTERM', handleExit);

  // Keep process alive
  return new Promise<void>(() => {});
}
