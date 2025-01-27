# ISS-test-task-todos

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### Структура проекта
- `src/assets` - изображения
- `src/components` - компоненты
- `src/router` - роутер
- `src/store` - хранилище
- `src/types` - типы
- `src/views` - страницы
- `src/App.vue` - корневой компонент
- `src/main.ts` - точка входа

### Использованные технологии
- Vue 3
- Vue-Router
- Pinia
- buefy
- @vueuse/core

# При разработке использовались eslint, prettier и stylelint для контроля качества кода