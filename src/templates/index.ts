import type { PluginTemplateContext } from './plugin/packageJson.js';
import { renderPackageJson } from './plugin/packageJson.js';
import { renderTsconfigJson } from './plugin/tsconfigJson.js';
import { renderTsupConfig } from './plugin/tsupConfig.js';
import { renderYolnomaConfig } from './plugin/yolnomaConfig.js';
import { renderIndexTsx } from './plugin/indexTsx.js';
import { renderHomePageTsx } from './plugin/homePageTsx.js';
import { renderGitignore } from './plugin/gitignore.js';
import { renderReadmeMd } from './plugin/readmeMd.js';

export type { PluginTemplateContext } from './plugin/packageJson.js';

/**
 * Returns a map of relative file paths to rendered string contents
 * for a starter Yolnoma plugin project.
 */
export function renderPluginTemplate(ctx: PluginTemplateContext): Map<string, string> {
  const files = new Map<string, string>();

  files.set('package.json', renderPackageJson(ctx));
  files.set('tsconfig.json', renderTsconfigJson());
  files.set('tsup.config.ts', renderTsupConfig());
  files.set('yolnoma.config.ts', renderYolnomaConfig(ctx));
  files.set('src/index.tsx', renderIndexTsx(ctx));
  files.set('src/pages/HomePage.tsx', renderHomePageTsx(ctx));
  files.set('.gitignore', renderGitignore());
  files.set('README.md', renderReadmeMd(ctx));

  return files;
}
