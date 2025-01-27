import type { Task } from "@/types/interfaces";

export interface Props {
	tasks: Map<number, Task>,
}

export interface Emits {
	(e: 'createTask'): void,
	(e: 'openTask', id: number): void,
	(e: 'deleteTask', id: number): void,
	(e: 'deleteTasks', ids: number[]): void,
	(e: 'editTask', id: number): void,
	(e: 'updateTask', id: number, updates: Partial<Omit<Task, 'id'>>): void
}
