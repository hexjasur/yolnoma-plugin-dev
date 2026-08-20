import type { PluginTemplateContext } from './packageJson.js';

export function renderIndexTsx(ctx: PluginTemplateContext): string {
  return `import { definePlugin } from '@yolnoma/plugin-sdk';
import { HomePage } from './pages/HomePage.js';

export default definePlugin({
  id: '${ctx.pluginId}',
  name: '${ctx.humanName}',
  version: '0.1.0',
  description: '${ctx.description}',
  author: {
    name: '${ctx.author}',
  },

  activate(api) {
    // Register main route
    api.router.addRoute({
      path: '/',
      component: HomePage,
      meta: {
        title: '${ctx.humanName}',
      },
    });

    // Register sidebar navigation item
    api.navigation.addItem({
      label: '${ctx.humanName}',
      path: '/',
    });
  },
});
`;
}
