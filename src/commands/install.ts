import path from 'path';
import fs from 'fs';
import os from 'os';
import { buildPluginCommand } from './build.js';
import { loadYolnomaConfig } from '../config/loader.js';
import { ensureDir, fileExists } from '../utils/fs.js';
import { logger } from '../utils/logger.js';

export interface InstallCommandOptions {
  readonly clean?: boolean;
}

/**
 * Returns the path to the Yolnoma plugins directory in AppData/Local without hardcoded user paths.
 */
export function getYolnomaPluginsDir(): string {
  const localAppData =
    process.env.LOCALAPPDATA ||
    (process.platform === 'win32'
      ? path.join(os.homedir(), 'AppData', 'Local')
      : path.join(os.homedir(), '.local', 'share'));

  if (!localAppData) {
    throw new Error('Could not resolve LOCALAPPDATA directory.');
  }

  return path.join(localAppData, 'Yolnoma', 'plugins');
}

/**
 * Copies the built dist/plugin.js artifact into the Yolnoma AppData plugins directory.
 */
export function copyPluginArtifactToAppData(
  projectDir: string,
  pluginId: string
): { destinationDir: string; destinationFile: string; sizeKb: string } {
  const distPluginJs = path.join(projectDir, 'dist', 'plugin.js');
  if (!fileExists(distPluginJs)) {
    throw new Error('Plugin output file "dist/plugin.js" not found.');
  }

  const pluginsRootDir = getYolnomaPluginsDir();
  const targetFolder = pluginId.trim();
  const targetPluginDir = path.join(pluginsRootDir, targetFolder);
  const targetPluginJs = path.join(targetPluginDir, 'plugin.js');

  ensureDir(targetPluginDir);
  fs.copyFileSync(distPluginJs, targetPluginJs);

  if (!fileExists(targetPluginJs)) {
    throw new Error(`Verification failed: installed plugin file does not exist at "${targetPluginJs}".`);
  }

  const stats = fs.statSync(targetPluginJs);
  const sizeKb = (stats.size / 1024).toFixed(2);

  return {
    destinationDir: targetPluginDir,
    destinationFile: targetPluginJs,
    sizeKb,
  };
}

/**
 * Builds the plugin project and installs the resulting dist/plugin.js
 * into the Yolnoma AppData plugins directory (%LOCALAPPDATA%\Yolnoma\plugins\<plugin-id>\plugin.js).
 */
export async function installPluginCommand(
  targetDir = process.cwd(),
  options: InstallCommandOptions = {}
): Promise<void> {
  const projectDir = path.resolve(targetDir);

  logger.raw(`\n\x1b[1mInstalling Yolnoma plugin in\x1b[0m \x1b[36m${projectDir}\x1b[0m...\n`);

  // 1. Validate yolnoma.config.ts first to get metadata
  let config;
  try {
    config = await loadYolnomaConfig(projectDir);
    logger.step(`Configuration found: \x1b[32m${config.name}\x1b[0m (\x1b[2m${config.id}\x1b[0m)`);
  } catch (err) {
    logger.error(err instanceof Error ? err.message : String(err));
    process.exitCode = 1;
    return;
  }

  // 2. Build the plugin using existing build command logic
  logger.step('Building plugin bundle...');
  const buildOk = await buildPluginCommand(projectDir, {
    clean: options.clean,
    silent: true,
  });

  if (!buildOk) {
    logger.error('Installation aborted due to build failure.');
    process.exitCode = 1;
    return;
  }
  logger.step('Plugin built successfully');

  // 3. Verify dist/plugin.js output exists
  const distPluginJs = path.join(projectDir, 'dist', 'plugin.js');
  if (!fileExists(distPluginJs)) {
    logger.error('Plugin output file "dist/plugin.js" not found.');
    process.exitCode = 1;
    return;
  }
  logger.step('Plugin output found: \x1b[32mdist/plugin.js\x1b[0m');

  // 4. Install artifact to AppData
  try {
    const { destinationDir, sizeKb } = copyPluginArtifactToAppData(projectDir, config.id);
    logger.step(`Installing to:\n    \x1b[36m${destinationDir}\x1b[0m`);
    logger.step(`Verified installed artifact: \x1b[32mplugin.js\x1b[0m (\x1b[36m${sizeKb} KB\x1b[0m)`);
  } catch (err) {
    logger.error(`Failed to install plugin artifact: ${err instanceof Error ? err.message : String(err)}`);
    process.exitCode = 1;
    return;
  }

  logger.success(`Plugin "${config.name}" installed successfully.`);
}
