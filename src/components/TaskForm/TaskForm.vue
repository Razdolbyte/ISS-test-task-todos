<script setup lang="ts">
import { useVModel } from "@vueuse/core";

import type { Task } from '@/types/interfaces';

const props = defineProps<{
	task: Omit<Task, 'id'| 'isCompleted'>;
	errors: {
		title?: string;
		description?: string;
		priority?: string;
	};
}>();
const emit = defineEmits<{
	(e: 'update:task', task: Task): void;
}>();

const task = useVModel(props, 'task', emit);
</script>

<template>
	<div class="task-form">
		<b-field
			label="Заголовок"
			:type="errors.title ? 'is-danger' : ''"
			:message="errors.title"
		>
			<b-input v-model="task.title" rounded />
		</b-field>
		<b-field label="Описание">
			<b-input v-model="task.description" type="textarea" rounded/>
		</b-field>
		<b-field label="Приоритет">
			<b-select v-model="task.priority" rounded>
				<option value="low">Низкий</option>
				<option value="medium">Средний</option>
				<option value="high">Высокий</option>
			</b-select>
		</b-field>
	</div>
</template>

<style scoped>

</style>
