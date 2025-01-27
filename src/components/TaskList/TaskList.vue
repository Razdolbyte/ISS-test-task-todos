<script setup lang="ts">
import { computed, ref } from 'vue'

import type { Task } from '@/types/interfaces'
import type { Emits, Props } from './config/interfaces'

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const filters = ref({
	perPage: 20,
	search: '',
	isCompleted: 'all',
	priority: 'all',
})
const checkedRows = ref<Task[]>([])

const filteredTasks = computed(() => {
	const tasksList = Array.from(props.tasks.values())

	return tasksList.filter((task: Task) => {
		const isCompleted =
			filters.value.isCompleted === 'all'
				? true
				: task.isCompleted === (filters.value.isCompleted === 'true')
		const isSearch = task.title.toLowerCase().includes(filters.value.search.toLowerCase())
		const isPriority =
			filters.value.priority === 'all' ? true : task.priority === filters.value.priority

		return isCompleted && isSearch && isPriority
	})
})

const updateTask = (task: Task) => {
	emits('updateTask', task.id, { isCompleted: task.isCompleted })
}
</script>

<template>
	<div class="task-list">
		<div class="task-list__filters">
			<b-field grouped group-multiline>
				<b-select class="task-list__filter" v-model="filters.perPage" rounded>
					<option value="5">5</option>
					<option value="20">20</option>
					<option value="50">50</option>
					<option value="100">100</option>
					<option value="-1">Все</option>
				</b-select>
				<b-select class="task-list__filter" v-model="filters.isCompleted" rounded>
					<option value="all">Все</option>
					<option value="true">Выполненные</option>
					<option value="false">Не выполненные</option>
				</b-select>
				<b-select class="task-list__filter" v-model="filters.priority" rounded>
					<option value="all">Все</option>
					<option value="high">high</option>
					<option class="is-warning" value="medium">medium</option>
					<option class="is-success" value="low">low</option>
				</b-select>
				<b-button
					class="task-list__filter"
					type="is-success"
					icon-right="plus"
					rounded
					@click="$emit('createTask')"
				/>
				<div class="task-list__filter-group">

					<b-button
						v-if="checkedRows.length > 0"
						class="task-list__filter"
						type="is-danger"
						icon-right="delete"
						rounded
						@click="
							$emit(
								'deleteTasks',
								checkedRows.map((task) => task.id),
							)
						"
					/>
					<b-input
						class="task-list__filter task-list__search"
						v-model="filters.search"
						placeholder="Поиск"
						rounded
					/>
				</div>
			</b-field>
		</div>

		<div class="task-list__table">
			<b-table
				:data="filteredTasks"
				paginated
				pagination-rounded
				draggable
				hoverable
				checkable
				mobile-cards
				v-model:checked-rows="checkedRows"
				:per-page="filters.perPage"
			>
				<b-table-column label="ID" v-slot="props">
					{{ props.row.id }}
				</b-table-column>
				<b-table-column label="Заголовок" v-slot="props">
					<a
						class="task-list__link"
						@click="$emit('openTask', props.row.id)"
					>
						{{ props.row.title }}
					</a>
				</b-table-column>
				<b-table-column label="Приоритет" v-slot="props">
					<span
						:class="{
							tag: true,
							'is-rounded': true,
							'task-list__priority': true,
							'is-success': props.row.priority === 'low',
							'is-warning': props.row.priority === 'medium',
							'is-danger': props.row.priority === 'high',
						}"
						rounded
					>
						<b-icon icon="fire" />{{ props.row.priority }}
					</span>
				</b-table-column>
				<b-table-column label="Выполнено" centered v-slot="props">
					<b-checkbox v-model="props.row.isCompleted" @input="updateTask(props.row)" />
				</b-table-column>
				<b-table-column custom-key="actions" v-slot="props">
					<div class="task-list__table-actions">
						<b-button
							type="is-info"
							icon-right="pencil"
							size="is-small"
							@click="$emit('editTask', props.row.id)"
							rounded
						/>
						<b-button
							type="is-danger"
							icon-right="delete"
							size="is-small"
							@click="$emit('deleteTask', props.row.id)"
							rounded
						/>
					</div>
				</b-table-column>
				<template #empty>
					<div class="has-text-centered">No records</div>
				</template>
			</b-table>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.task-list {
	display: flex;
	flex-direction: column;
	gap: 20px;

	&__filter {
		margin-right: 10px;
	}

	&__filter-group {
		display: flex;
		gap: 10px;
		width: 50%;
		margin-left: auto;
	}

	&__search {
		width: 100%;
	}

	&__priority {
		gap: 0 12px;
	}

	&__table-actions {
		display: flex;
		gap: 10px;
	}
}
</style>
