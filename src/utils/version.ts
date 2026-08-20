import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

declare const __CLI_VERSION__: string | undefined;

/**
 * Returns the CLI version dynamically from build-time injection or package.json.
 */
export function getCliVersion(): string {
  if (typeof __CLI_VERSION__ !== 'undefined') {
    return __CLI_VERSION__;
  }

  try {
    // Search upwards from the current module directory for package.json
    let currentDir = path.dirname(fileURLToPath(import.meta.url));
    for (let i = 0; i < 5; i++) {
      const candidate = path.join(currentDir, 'package.json');
      if (fs.existsSync(candidate)) {
        const raw = fs.readFileSync(candidate, 'utf8');
        const pkg = JSON.parse(raw);
        if (pkg.version && typeof pkg.version === 'string') {
          return pkg.version;
        }
      }
      const parent = path.dirname(currentDir);
      if (parent === currentDir) break;
      currentDir = parent;
    }
  } catch {
    // Fallback if filesystem access fails
  }

  return '0.0.0';
}
