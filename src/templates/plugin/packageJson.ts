export interface PluginTemplateContext {
  readonly projectName: string;
  readonly pluginId: string;
  readonly humanName: string;
  readonly description: string;
  readonly author: string;
}

export function renderPackageJson(ctx: PluginTemplateContext): string {
  return JSON.stringify(
    {
      name: ctx.projectName,
      version: '0.1.0',
      private: true,
      description: ctx.description,
      type: 'module',
      scripts: {
        build: 'tsup',
        dev: 'tsup --watch',
        typecheck: 'tsc --noEmit',
      },
      dependencies: {
        '@yolnoma/plugin-sdk': '^0.1.0',
      },
      devDependencies: {
        '@types/react': '^18.3.12',
        '@types/react-dom': '^18.3.1',
        react: '^18.3.1',
        'react-dom': '^18.3.1',
        tsup: '^8.3.0',
        typescript: '^5.6.3',
      },
    },
    null,
    2
  ) + '\n';
}
