import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Task } from "@/types/interfaces";

export const useTasksStore = defineStore('tasks', () => {
  const tasksList = ref<Map<number, Task>>(new Map());

  const setTasks = (tasks: Map<number, Task>) => {
	tasksList.value = new Map(tasks);
  };
  const createTask = (task: Omit<Task, 'id'| 'isCompleted'>) => {
	const id = Date.now();
	const newTask: Task = {
		...task,
		id,
		isCompleted: false,
	};
	tasksList.value.set(id, newTask);
  };

  const updateTask = (id: number, updates: Partial<Omit<Task, 'id'>>) => {
	const existingTask = tasksList.value.get(id);
	if (existingTask) {
	  tasksList.value.set(id, { ...existingTask, ...updates });
	}
  };

  const getTask = (id: number) => {
	return tasksList.value.get(id);
  };

  const deleteTask = (id: number) => {
	tasksList.value.delete(id);
  };

  const deleteTasks = (ids: number[]) => {
	ids.forEach(id => tasksList.value.delete(id));
  };

  return {
	tasksList,

	setTasks,
	createTask,
	getTask,
	updateTask,
	deleteTask,
	deleteTasks,
  }
});
