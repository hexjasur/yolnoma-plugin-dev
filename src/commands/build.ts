import path from 'path';
import fs from 'fs';
import { build as tsupBuild } from 'tsup';
import { loadYolnomaConfig, findConfigFile } from '../config/loader.js';
import { fileExists, dirExists } from '../utils/fs.js';
import { logger } from '../utils/logger.js';

export interface BuildCommandOptions {
  readonly sourcemap?: boolean;
  readonly clean?: boolean;
}

/**
 * Builds a Yolnoma plugin project into dist/plugin.js.
 */
export async function buildPluginCommand(
  targetDir = process.cwd(),
  options: BuildCommandOptions = {}
): Promise<void> {
  const projectDir = path.resolve(targetDir);

  logger.raw(`\n\x1b[1mBuilding Yolnoma plugin in\x1b[0m \x1b[36m${projectDir}\x1b[0m...\n`);

  // 1. Verify package.json exists
  const packageJsonPath = path.join(projectDir, 'package.json');
  if (!fileExists(packageJsonPath)) {
    logger.error(`No package.json found in "${projectDir}". Ensure you run this command inside a plugin project.`);
    process.exitCode = 1;
    return;
  }

  // 2. Verify yolnoma.config.ts exists and load configuration
  let config;
  try {
    config = await loadYolnomaConfig(projectDir);
    const configFile = path.basename(findConfigFile(projectDir)!);
    logger.step(`Configuration found: \x1b[32m${config.name}\x1b[0m (\x1b[2m${config.id}\x1b[0m, from ${configFile})`);
  } catch (err) {
    logger.error(err instanceof Error ? err.message : String(err));
    process.exitCode = 1;
    return;
  }

  // 3. Verify entry file exists
  const indexTsx = path.join(projectDir, 'src', 'index.tsx');
  const indexTs = path.join(projectDir, 'src', 'index.ts');
  let entryFile: string;

  if (fileExists(indexTsx)) {
    entryFile = indexTsx;
    logger.step('Plugin entry found: \x1b[32msrc/index.tsx\x1b[0m');
  } else if (fileExists(indexTs)) {
    entryFile = indexTs;
    logger.step('Plugin entry found: \x1b[32msrc/index.ts\x1b[0m');
  } else {
    logger.error(`Plugin entry file not found at "src/index.tsx" or "src/index.ts" in "${projectDir}".`);
    process.exitCode = 1;
    return;
  }

  // 4. Run the bundle build
  logger.step('Building plugin bundle (ES module)...');
  const outDir = path.join(projectDir, 'dist');
  const startTime = Date.now();

  try {
    await tsupBuild({
      entry: {
        plugin: entryFile,
      },
      outDir,
      format: ['esm'],
      target: 'es2020',
      clean: options.clean ?? true,
      dts: false,
      sourcemap: options.sourcemap ?? true,
      splitting: false,
      bundle: true,
      silent: true,
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        '@yolnoma/plugin-sdk',
      ],
      outExtension() {
        return {
          js: '.js',
        };
      },
    });
  } catch (err) {
    logger.error(`Build failed: ${err instanceof Error ? err.message : String(err)}`);
    process.exitCode = 1;
    return;
  }

  const duration = Date.now() - startTime;
  logger.step(`Build completed in \x1b[36m${duration}ms\x1b[0m`);

  // 5. Verify that dist/plugin.js actually exists
  const outputPluginJs = path.join(outDir, 'plugin.js');
  if (!fileExists(outputPluginJs)) {
    logger.error('Build output verification failed: "dist/plugin.js" was not generated.');
    process.exitCode = 1;
    return;
  }

  const stats = fs.statSync(outputPluginJs);
  const sizeKb = (stats.size / 1024).toFixed(2);
  logger.step(`Output verified: \x1b[32mdist/plugin.js\x1b[0m (\x1b[36m${sizeKb} KB\x1b[0m)`);

  logger.success(`Plugin "${config.name}" built successfully.`);
}
