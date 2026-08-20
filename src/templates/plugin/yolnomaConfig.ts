import type { PluginTemplateContext } from './packageJson.js';

export function renderYolnomaConfig(ctx: PluginTemplateContext): string {
  return `export interface YolnomaPluginConfig {
  id: string;
  name: string;
  version: string;
  description?: string;
  author?: {
    name: string;
    email?: string;
    url?: string;
  };
}

export function defineConfig(config: YolnomaPluginConfig): YolnomaPluginConfig {
  return config;
}

export default defineConfig({
  id: '${ctx.pluginId}',
  name: '${ctx.humanName}',
  version: '0.1.0',
  description: '${ctx.description}',
  author: {
    name: '${ctx.author}',
  },
});
`;
}
