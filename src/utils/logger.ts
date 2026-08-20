/**
 * Terminal logger with clean formatting.
 */

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  red: '\x1b[31m',
};

export const logger = {
  info(msg: string): void {
    console.log(`${colors.cyan}ℹ${colors.reset} ${msg}`);
  },

  step(msg: string): void {
    console.log(`${colors.green}✔${colors.reset} ${msg}`);
  },

  success(msg: string): void {
    console.log(`\n${colors.bright}${colors.green}✔ ${msg}${colors.reset}\n`);
  },

  warn(msg: string): void {
    console.log(`${colors.yellow}⚠${colors.reset} ${msg}`);
  },

  error(msg: string): void {
    console.error(`${colors.red}✖ Error:${colors.reset} ${msg}`);
  },

  raw(msg: string): void {
    console.log(msg);
  },
};
