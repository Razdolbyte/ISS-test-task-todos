<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
	<div class="app">
		<div class="app__header">
			<h1 class="app__title">ToDo App Vue3 + TypeScript</h1>
		</div>
		<div class="app__main">
			<RouterView />
		</div>
	</div>
</template>

<style lang="scss" scoped>
.app {
	display: flex;
	flex-direction: column;
	height: 100vh;

	&__header {
		height: 64px;
		color: #f5f5f5;
		text-align: center;
		background-color: #333;
	}

	&__title {
		margin: 0;
		font-size: 32px;
		font-weight: 700;
		line-height: 60px;
	}

	&__main {
		flex: 1;
		padding: 20px;
		background-color: #f5f5f5;
	}
}
</style>
