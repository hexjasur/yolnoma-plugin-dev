declare const __CLI_VERSION__: string | undefined;

/**
 * Returns the CLI version injected at build time from package.json.
 */
export function getCliVersion(): string {
  return typeof __CLI_VERSION__ !== 'undefined' ? __CLI_VERSION__ : '0.0.0-dev';
}
