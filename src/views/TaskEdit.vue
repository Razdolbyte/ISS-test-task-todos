<script setup lang="ts">
import { ref, onMounted, watch } from "vue";

import { useTasksStore } from "@/stores/useTasksStore";
import { TaskForm } from "@/components";
import type { Task } from "@/types/interfaces";

const props = defineProps<{
	id?: string;
	closeAction: () => void;
}>();
const tasksStore = useTasksStore();

const task = ref<Omit<Task, 'id'| 'isCompleted'>>({
	title: "",
	description: "",
	priority: "low",
});

const errors = ref<{
	title?: string;
}>({});

const loadTask = (id: string) => {
	const taskData = tasksStore.getTask(Number(id));
	if (taskData) {
		const { title, description, priority } = taskData;
		task.value = { title, description, priority };
	}
}
const handleAction = (task: Omit<Task, 'id'| 'isCompleted'>) => {
	if (!task.title) {
		errors.value.title = "Заголовок обязателен";
		return;
	}

	if (props.id) {
		tasksStore.updateTask(Number(props.id), task);
	} else {
		tasksStore.createTask(task);
	}

	props.closeAction()
};

watch(
	() => task.value.title,
	(newValue) => {
		if (newValue) {
			errors.value = {};
		} else {
			errors.value.title = "Заголовок обязателен";
		}
	},
);

onMounted(() => {
	if (props.id) {
		loadTask(props.id);
	}
})
</script>

<template>
	<div class="task-edit">
		<h2 class="task-edit__title">{{ props.id ? 'Редактировать' : 'Создать' }} задачу</h2>
		<TaskForm v-model:task="task" :errors="errors" />
		<div class="task-edit__actions">
			<b-button type="is-success" rounded @click="handleAction(task)">
				{{ props.id ? 'Сохранить' : 'Создать' }}
			</b-button>
			<b-button type="is-danger" rounded @click="closeAction">
				Закрыть
			</b-button>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.task-edit {
	display: flex;
	flex-direction: column;
	gap: 20px;
	height: 100%;
	padding: 10px;

	&__title {
		font-size: 24px;
		font-weight: 700;
		text-align: center;
	}

	&__actions {
		display: flex;
		justify-content: space-between;
		margin-top: auto;
	}
}
</style>
