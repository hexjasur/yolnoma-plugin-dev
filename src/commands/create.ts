import path from 'path';
import fs from 'fs';
import {
  toKebabCase,
  toTitleCase,
  generatePluginId,
  validateProjectName,
} from '../utils/formatting.js';
import { ensureDir, writeFile, dirExists } from '../utils/fs.js';
import { logger } from '../utils/logger.js';
import { renderPluginTemplate } from '../templates/index.js';
import type { PluginTemplateContext } from '../templates/index.js';

export interface CreateCommandOptions {
  readonly id?: string;
  readonly author?: string;
  readonly description?: string;
  readonly template?: string;
}

/**
 * Creates a new Yolnoma plugin project from scratch.
 */
export async function createPluginCommand(
  rawName: string,
  options: CreateCommandOptions = {}
): Promise<void> {
  const nameValidation = validateProjectName(rawName);
  if (!nameValidation.valid) {
    logger.error(nameValidation.error ?? 'Invalid project name.');
    process.exitCode = 1;
    return;
  }

  const projectName = toKebabCase(rawName);
  const targetDir = path.resolve(process.cwd(), projectName);

  // Check if directory exists and has files
  if (dirExists(targetDir)) {
    const existingFiles = fs.readdirSync(targetDir);
    if (existingFiles.length > 0) {
      logger.error(`Target directory "${projectName}" already exists and is not empty.`);
      process.exitCode = 1;
      return;
    }
  }

  const humanName = toTitleCase(projectName);
  const pluginId = options.id ?? generatePluginId(projectName);
  const author = options.author ?? 'Yolnoma Developer';
  const description = options.description ?? `A Yolnoma desktop application plugin`;

  const ctx: PluginTemplateContext = {
    projectName,
    pluginId,
    humanName,
    description,
    author,
  };

  logger.raw(`\nCreating new Yolnoma plugin in \x1b[36m${targetDir}\x1b[0m...\n`);

  ensureDir(targetDir);

  const files = renderPluginTemplate(ctx);

  logger.step('Creating plugin project structure...');
  logger.step('Configuring TypeScript & build settings (tsup)...');
  logger.step('Configuring @yolnoma/plugin-sdk integration...');

  for (const [relPath, content] of files) {
    const fullPath = path.join(targetDir, relPath);
    writeFile(fullPath, content);
  }

  logger.success(`Plugin "${humanName}" (${pluginId}) created successfully.`);

  logger.raw('Next steps:\n');
  logger.raw(`  \x1b[36mcd\x1b[0m ${projectName}`);
  logger.raw(`  \x1b[36mnpm install\x1b[0m`);
  logger.raw(`  \x1b[36mnpm run build\x1b[0m\n`);
}
