export function renderTsconfigJson(): string {
  return JSON.stringify(
    {
      compilerOptions: {
        target: 'ES2020',
        module: 'ESNext',
        moduleResolution: 'bundler',
        lib: ['ES2020', 'DOM', 'DOM.Iterable'],
        jsx: 'react-jsx',
        strict: true,
        noEmit: true,
        skipLibCheck: true,
        forceConsistentCasingInFileNames: true,
        esModuleInterop: true,
      },
      include: ['src', 'yolnoma.config.ts', 'tsup.config.ts'],
      exclude: ['node_modules', 'dist'],
    },
    null,
    2
  ) + '\n';
}
