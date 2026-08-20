import { createPluginCommand } from '../commands/create.js';
import { buildPluginCommand } from '../commands/build.js';
import { logger } from '../utils/logger.js';

const VERSION = '0.1.0';

export async function runCli(args: string[]): Promise<void> {
  if (args.length === 0 || args.includes('-h') || args.includes('--help')) {
    printHelp();
    return;
  }

  if (args.includes('-v') || args.includes('--version')) {
    console.log(`yolnoma-plugin-dev v${VERSION}`);
    return;
  }

  const [command, ...rest] = args;

  switch (command) {
    case 'create': {
      const name = rest[0];
      if (!name || name.startsWith('-')) {
        logger.error('Please specify a plugin project name:');
        logger.raw('  yolnoma-plugin-dev create <name>\n');
        logger.raw('Example:');
        logger.raw('  yolnoma-plugin-dev create hello-plugin\n');
        process.exitCode = 1;
        return;
      }

      let id: string | undefined;
      let author: string | undefined;
      let description: string | undefined;

      for (let i = 1; i < rest.length; i++) {
        const arg = rest[i];
        if (arg === '--id' && rest[i + 1]) {
          id = rest[++i];
        } else if (arg === '--author' && rest[i + 1]) {
          author = rest[++i];
        } else if (arg === '--desc' && rest[i + 1]) {
          description = rest[++i];
        }
      }

      await createPluginCommand(name, { id, author, description });
      break;
    }

    case 'build': {
      const targetDir = rest[0] && !rest[0].startsWith('-') ? rest[0] : process.cwd();
      await buildPluginCommand(targetDir);
      break;
    }

    default: {
      logger.error(`Unknown command: "${command}"`);
      printHelp();
      process.exitCode = 1;
    }
  }
}

function printHelp(): void {
  console.log(`
\x1b[1mYolnoma Plugin Dev\x1b[0m — Official developer CLI for Yolnoma plugins

\x1b[1mUSAGE:\x1b[0m
  yolnoma-plugin-dev <command> [options]

\x1b[1mCOMMANDS:\x1b[0m
  \x1b[36mcreate <name>\x1b[0m    Create a new starter Yolnoma plugin project
  \x1b[36mbuild [dir]\x1b[0m      Build a Yolnoma plugin project into dist/plugin.js

\x1b[1mOPTIONS:\x1b[0m
  -v, --version    Show CLI version
  -h, --help       Show help menu

\x1b[1mCREATE OPTIONS:\x1b[0m
  --id <id>        Custom reverse-DNS plugin identifier (e.g. com.myorg.my-plugin)
  --author <name>  Plugin author name
  --desc <text>    Short description of the plugin

\x1b[1mEXAMPLES:\x1b[0m
  yolnoma-plugin-dev create hello-plugin
  yolnoma-plugin-dev build
  yolnoma-plugin-dev build ./my-plugin
`);
}
