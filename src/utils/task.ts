import {
    Task,
    TaskCounts,
    TaskFilter,
    TaskPriority,
    TaskSortMode,
} from '../types/task';
import { parseDueDate } from './date';

const PRIORITY_WEIGHT: Record<TaskPriority, number> = {
    high: 3,
    medium: 2,
    low: 1,
};

export function isTaskPriority(value: unknown): value is TaskPriority {
    return value === 'low' || value === 'medium' || value === 'high';
}

export function countTasks(tasks: readonly Task[]): TaskCounts {
    const completed = tasks.filter((task) => task.status === 'completed').length;

    return {
        total: tasks.length,
        active: tasks.length - completed,
        completed,
    };
}

export function sortByPriority(tasks: readonly Task[]): Task[] {
    return [...tasks].sort(
        (a, b) => PRIORITY_WEIGHT[b.priority] - PRIORITY_WEIGHT[a.priority],
    );
}

export function sortTasks(tasks: readonly Task[], mode: TaskSortMode): Task[] {
    return mode === 'priority' ? sortByPriority(tasks) : [...tasks];
}

export function filterByStatus(
    tasks: readonly Task[],
    filter: TaskFilter,
): Task[] {
    if (filter === 'all') {
        return [...tasks];
    }

    return tasks.filter((task) => task.status === filter);
}


export function filterTasks(tasks: readonly Task[], query: string): Task[] {
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
        return [...tasks];
    }

    return tasks.filter(
        (task) =>
            task.title.toLowerCase().includes(normalized) ||
            task.subject.toLowerCase().includes(normalized),
    );
}

export function isTaskOverdue(task: Task, now: Date = new Date()): boolean {
    if (!task.dueDate || task.status === 'completed') {
        return false;
    }

    const deadline = parseDueDate(task.dueDate);
    return deadline !== null && deadline.getTime() < now.getTime();
}
