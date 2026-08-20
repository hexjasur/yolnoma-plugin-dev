import path from 'path';
import fs from 'fs';
import { getYolnomaPluginsDir } from './install.js';
import { loadYolnomaConfig } from '../config/loader.js';
import { dirExists } from '../utils/fs.js';
import { logger } from '../utils/logger.js';

export interface UninstallCommandOptions {
  readonly force?: boolean;
}

/**
 * Uninstalls a Yolnoma plugin by removing its directory from %LOCALAPPDATA%\Yolnoma\plugins\<plugin-id>\
 */
export async function uninstallPluginCommand(
  targetDir = process.cwd(),
  _options: UninstallCommandOptions = {}
): Promise<void> {
  const projectDir = path.resolve(targetDir);

  logger.raw(`\n\x1b[1mUninstalling Yolnoma plugin in\x1b[0m \x1b[36m${projectDir}\x1b[0m...\n`);

  // 1. Read yolnoma.config.ts to get the plugin ID and name
  let config;
  try {
    config = await loadYolnomaConfig(projectDir);
    logger.step(`Configuration found: \x1b[32m${config.name}\x1b[0m (\x1b[2m${config.id}\x1b[0m)`);
  } catch (err) {
    logger.error(err instanceof Error ? err.message : String(err));
    process.exitCode = 1;
    return;
  }

  // 2. Resolve destination path in %LOCALAPPDATA%\Yolnoma\plugins\<config.id>
  let pluginsRootDir: string;
  try {
    pluginsRootDir = getYolnomaPluginsDir();
  } catch (err) {
    logger.error(err instanceof Error ? err.message : String(err));
    process.exitCode = 1;
    return;
  }

  const targetFolder = config.id.trim();
  const targetPluginDir = path.join(pluginsRootDir, targetFolder);

  // 3. Check if plugin directory exists
  if (!dirExists(targetPluginDir)) {
    logger.warn(`Plugin "${config.id}" is not installed.`);
    logger.raw(`  Expected path: \x1b[2m${targetPluginDir}\x1b[0m\n`);
    return;
  }

  // 4. Removal logs
  logger.raw(`Removing plugin \x1b[32m"${config.name}"\x1b[0m (\x1b[2m${config.id}\x1b[0m)...`);
  logger.raw(`From:\n  \x1b[36m${targetPluginDir}\x1b[0m\n`);

  // 5. Remove directory recursively
  try {
    fs.rmSync(targetPluginDir, { recursive: true, force: true });
  } catch (err) {
    logger.error(`Failed to remove plugin directory: ${err instanceof Error ? err.message : String(err)}`);
    process.exitCode = 1;
    return;
  }

  // 6. Verify removal
  if (dirExists(targetPluginDir)) {
    logger.error(`Verification failed: directory still exists at "${targetPluginDir}".`);
    process.exitCode = 1;
    return;
  }

  logger.success(`Plugin "${config.name}" uninstalled successfully.`);
}
