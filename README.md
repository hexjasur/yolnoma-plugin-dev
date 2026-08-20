# yolnoma-plugin-dev

> Official developer CLI and build tool for Yolnoma plugins.

## Overview

`yolnoma-plugin-dev` helps developers bootstrap and build plugins for the Yolnoma desktop application.

## Installation

```bash
# Global
npm install -g yolnoma-plugin-dev

# Or use with npx
npx yolnoma-plugin-dev create <plugin-name>
```

## Commands

### `create <name>`

Scaffolds a complete starter plugin project.

```bash
yolnoma-plugin-dev create hello-plugin
```

Options:
- `--id <id>`: Custom reverse-DNS identifier (default: `com.example.<name>`)
- `--author <author>`: Author name
- `--desc <description>`: Plugin description

### Generated Project Structure

```text
hello-plugin/
├── src/
│   ├── index.tsx          ← Plugin entry point using definePlugin()
│   └── pages/
│       └── HomePage.tsx   ← React UI component
├── package.json
├── tsconfig.json
├── tsup.config.ts         ← Pre-configured ES module bundler
├── yolnoma.config.ts      ← Plugin configuration
├── .gitignore
└── README.md
```

## Development Workflow

1. Create a plugin:
   ```bash
   yolnoma-plugin-dev create my-plugin
   ```
2. Navigate into the directory:
   ```bash
   cd my-plugin
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Build the plugin bundle:
   ```bash
   npm run build
   ```
   This generates `dist/plugin.js`, ready to be loaded into Yolnoma.

## License

MIT — JK Software
