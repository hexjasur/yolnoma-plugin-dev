import type { PluginTemplateContext } from './packageJson.js';

export function renderReadmeMd(ctx: PluginTemplateContext): string {
  return `# ${ctx.humanName}

> A plugin for the Yolnoma desktop application.

## Development

Install dependencies:

\`\`\`bash
npm install
\`\`\`

Build the plugin bundle:

\`\`\`bash
npm run build
\`\`\`

This outputs \`dist/plugin.js\`, which can be loaded into Yolnoma.

Typecheck:

\`\`\`bash
npm run typecheck
\`\`\`
`;
}
