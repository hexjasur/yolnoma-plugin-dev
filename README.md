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

### `build [dir]`

Builds the plugin project into `dist/plugin.js`.

```bash
yolnoma-plugin-dev build
# or specify project directory
yolnoma-plugin-dev build ./my-plugin
```

### `install [dir]`

Builds the plugin and automatically installs `dist/plugin.js` to the Yolnoma AppData plugins directory (`%LOCALAPPDATA%\Yolnoma\plugins\<plugin-id>\plugin.js`).

```bash
yolnoma-plugin-dev install
# or specify project directory
yolnoma-plugin-dev install ./my-plugin
```

### `uninstall [dir]`

Uninstalls the plugin by removing its directory from the Yolnoma AppData plugins directory (`%LOCALAPPDATA%\Yolnoma\plugins\<plugin-id>\`).

```bash
yolnoma-plugin-dev uninstall
# or specify project directory
yolnoma-plugin-dev uninstall ./my-plugin
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
   yolnoma-plugin-dev build
   ```
5. Install into Yolnoma:
   ```bash
   yolnoma-plugin-dev install
   ```
6. Uninstall from Yolnoma when needed:
   ```bash
   yolnoma-plugin-dev uninstall
   ```

## License

MIT — JK Software
