# Katana Tools

## Product Env
 
- **VITE_PUBLIC_SERVER_URL** -- backend server url
- **VITE_PUBLIC_DOMAIN** -- cookie domain
- **VITE_PUBLIC_COOKIE_PREFIX** -- token cookie's prefix
- **VITE_PUBLIC_MENU_ITEM_ID** -- menu item id ( `window` | `iframe` )
- **VITE_PUBLIC_PROJECT_NAME** -- chrome tool name

---

## Commands

### Installing the project

Run the following command:

```shell
pnpm i
```

### Syncing resources shared by back-end

Run the following command:

```shell
pnpm run sync-common
```

### Running the project

Run the following command:

```shell
pnpm run dev
```

### Building the project

Run the following command:

```shell
pnpm run build
```

### Linting the project

Run the following command:

```shell
pnpm run lint
```

---

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
