<script setup lang="ts">
import { useStorage } from "@vueuse/core";
import { ToastProgrammatic, DialogProgrammatic } from 'buefy';
import { storeToRefs } from "pinia";
import { onMounted, ref, watch } from "vue";
import { RouterView, useRouter } from "vue-router";

import { TaskList } from '@/components';

import { ROUTE_NAMES } from "@/router/routeNames";
import { useTasksStore } from '@/stores/useTasksStore';
import type { Task } from "@/types/interfaces";

const router = useRouter();

const tasksStore = useTasksStore();
const { tasksList } = storeToRefs(tasksStore);
const localStorage = useStorage('tasks', tasksList.value);

const Toast = new ToastProgrammatic();
const Dialog = new DialogProgrammatic();

const isSidebarOpen = ref(false);

const openTask = (id: number) => {
	isSidebarOpen.value = true;
	router.push({ name: ROUTE_NAMES.TASK, params: { id } });
};

const editTask = (id: number) => {
	isSidebarOpen.value = true;
	router.push({ name: ROUTE_NAMES.EDIT, params: { id } });
};

const createTask = () => {
	isSidebarOpen.value = true;
	router.push({ name: ROUTE_NAMES.CREATE });
};

const closeSidebar = () => {
	isSidebarOpen.value = false;
	router.push({ name: ROUTE_NAMES.LIST });
};

const updateTask = (id: number, data: Partial<Task>) => {
	tasksStore.updateTask(id, data);

	Toast.open({
		message: 'Задача успешно обновлена',
		type: 'is-success',
		duration: 2000,
	});
};

const deleteTask = (id: number) => {
	Dialog.confirm({
		title: 'Удалить задачу',
		message: 'Вы уверены, что хотите удалить задачу?',
		confirmText: 'Удалить',
		cancelText: 'Отмена',
		type: 'is-danger',
		hasIcon: true,
		onConfirm: () => {
			tasksStore.deleteTask(id);
			Toast.open({
				message: 'Задача успешно удалена',
				type: 'is-success',
				duration: 2000,
			});
		},
	});
};

const deleteTasks = (ids: number[]) => {
	Dialog.confirm({
		title: 'Удалить задачи',
		message: 'Вы уверены, что хотите удалить эти задачи?',
		confirmText: 'Удалить',
		cancelText: 'Отмена',
		type: 'is-danger',
		hasIcon: true,
		onConfirm: () => {
			tasksStore.deleteTasks(ids);
			Toast.open({
				message: 'Задачи успешно удалены',
				type: 'is-success',
				duration: 2000,
			});
		},
	});
};

watch(
	() => tasksList.value,
	() => {
		console.log("Я тут");
		localStorage.value = tasksList.value;
	}
);

onMounted(() => {
	tasksStore.setTasks(localStorage.value);
});
</script>

<template>
  <div class="to-do-page">
	<div class="container">
		<TaskList
			:tasks="tasksList"
			@open-task="openTask"
			@edit-task="editTask"
			@create-task="createTask"
			@delete-task="deleteTask"
			@delete-tasks="deleteTasks"
			@update-task="updateTask"
		/>
	</div>
	<b-sidebar
		class="to-do-page__sidebar"
		v-model="isSidebarOpen"
		fullheight
		:overlay="false"
		right
		mobile="fullwidth"
		scroll="keep"
		@close="closeSidebar"
	>
		<RouterView v-slot="{ Component }">
			<component :is="Component" :close-action="closeSidebar"/>
		</RouterView>
	</b-sidebar>
  </div>
</template>

<style lang="scss">
.to-do-page {
	&__sidebar > .sidebar-content {
		width: 320px;
	}
}
</style>
