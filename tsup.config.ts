import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  outDir: 'dist',
  format: ['esm'],
  target: 'node18',
  clean: true,
  dts: true,
  sourcemap: true,
  bundle: true,
  minify: false,
});
