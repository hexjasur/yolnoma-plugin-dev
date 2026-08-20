import { runCli } from './cli/parser.js';

export { runCli } from './cli/parser.js';
export { createPluginCommand } from './commands/create.js';
export { buildPluginCommand } from './commands/build.js';
export { installPluginCommand, getYolnomaPluginsDir } from './commands/install.js';
export { uninstallPluginCommand } from './commands/uninstall.js';
export { loadYolnomaConfig } from './config/loader.js';
export { renderPluginTemplate } from './templates/index.js';

// Auto-run if executed directly as a script
const isMain =
  import.meta.url.endsWith('dist/index.js') ||
  import.meta.url.endsWith('src/index.ts') ||
  (process.argv[1] && process.argv[1].includes('yolnoma-plugin-dev'));

if (isMain) {
  runCli(process.argv.slice(2)).catch((err) => {
    console.error('Fatal CLI Error:', err);
    process.exit(1);
  });
}
