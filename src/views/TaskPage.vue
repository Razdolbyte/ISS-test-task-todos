<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

import { useTasksStore } from "@/stores/useTasksStore";
import type { Task } from "@/types/interfaces";
import { ROUTE_NAMES } from "@/router/routeNames";

const props = defineProps<{
	id?: string;
	closeAction: () => void;
}>();
const router = useRouter();
const tasksStore = useTasksStore();

const task = ref<Task | null>(null);

const loadTask = (id: string) => {
	const taskData = tasksStore.getTask(Number(id));
	if (taskData) {
		task.value = taskData;
	}
}
const goToEdit = () => {
	router.push({
		name: ROUTE_NAMES.EDIT,
		params: { id: props.id },
	});
};

onMounted(() => {
	if (props.id) {
		loadTask(props.id);
	}
})
</script>

<template>
	<div class="task-page">
		<h2 class="task-page__title">{{ task?.title }}</h2>
		<p class="task-page__description">{{ task?.description }}</p>
		<b-tag
			v-if="task?.priority"
			:type="
				task?.priority === 'low'
					? 'is-success'
					: task?.priority === 'medium'
						? 'is-warning'
						: 'is-danger'
			"
			size="is-medium"
			icon="fire"
			rounded
		>
			{{ task?.priority }}
		</b-tag>
		<div class="task-page__actions">
			<b-button type="is-success" rounded @click="goToEdit">
				Редактировать
			</b-button>
			<b-button type="is-danger" rounded @click="closeAction">
				Закрыть
			</b-button>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.task-page {
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

	&__description {
		font-size: 18px;
		font-weight: 500;
	}

	&__actions {
		display: flex;
		justify-content: space-between;
		margin-top: auto;
	}
}
</style>
