import path from 'path';
import fs from 'fs';

export interface YolnomaConfig {
  id: string;
  name: string;
  version?: string;
  description?: string;
  author?: string | { name: string; email?: string; url?: string };
}

const CONFIG_FILENAMES = [
  'yolnoma.config.ts',
  'yolnoma.config.js',
  'yolnoma.config.mjs',
  'yolnoma.config.cjs',
];

export function findConfigFile(dir: string): string | null {
  for (const filename of CONFIG_FILENAMES) {
    const fullPath = path.join(dir, filename);
    if (fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) {
      return fullPath;
    }
  }
  return null;
}

/**
 * Loads and validates a Yolnoma plugin configuration file.
 */
export async function loadYolnomaConfig(projectDir: string): Promise<YolnomaConfig> {
  const configFile = findConfigFile(projectDir);
  if (!configFile) {
    throw new Error(
      `No yolnoma.config.ts found in "${projectDir}". Ensure you are running the command inside a Yolnoma plugin project.`
    );
  }

  const content = fs.readFileSync(configFile, 'utf8');

  // Extract fields safely
  const idMatch = content.match(/id\s*:\s*['"`]([^'"`]+)['"`]/);
  const nameMatch = content.match(/name\s*:\s*['"`]([^'"`]+)['"`]/);
  const versionMatch = content.match(/version\s*:\s*['"`]([^'"`]+)['"`]/);
  const descMatch = content.match(/description\s*:\s*['"`]([^'"`]+)['"`]/);
  const authorMatch = content.match(/author\s*:\s*(?:['"`]([^'"`]+)['"`]|{\s*name\s*:\s*['"`]([^'"`]+)['"`])/);

  const id = idMatch?.[1]?.trim();
  const name = nameMatch?.[1]?.trim();

  if (!id) {
    throw new Error(`Invalid yolnoma.config.ts: missing required property "id".`);
  }

  if (!name) {
    throw new Error(`Invalid yolnoma.config.ts: missing required property "name".`);
  }

  const version = versionMatch?.[1]?.trim() ?? '0.1.0';
  const description = descMatch?.[1]?.trim();
  const author = authorMatch?.[1] || authorMatch?.[2] || 'Yolnoma Developer';

  return {
    id,
    name,
    version,
    description,
    author,
  };
}
