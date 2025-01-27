import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import stylelint from "vite-plugin-stylelint";

// https://vite.dev/config/
export default defineConfig({
	base: '/iss-test-task-todos/',
	plugins: [
		vue(),
		vueDevTools(),
		stylelint({
		dev: true,
		fix: true,
		include: "**/*.{css,scss,sass,vue}",
		}),
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		},
	},
})
