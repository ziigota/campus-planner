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

/** Подсчёт всех, активных и завершённых задач. */
export function countTasks(tasks: readonly Task[]): TaskCounts {
    const completed = tasks.filter((task) => task.status === 'completed').length;

    return {
        total: tasks.length,
        active: tasks.length - completed,
        completed,
    };
}

/** Сортировка по приоритету: сначала высокий. Исходный массив не меняется. */
export function sortByPriority(tasks: readonly Task[]): Task[] {
    return [...tasks].sort(
        (a, b) => PRIORITY_WEIGHT[b.priority] - PRIORITY_WEIGHT[a.priority],
    );
}

export function sortTasks(tasks: readonly Task[], mode: TaskSortMode): Task[] {
    return mode === 'priority' ? sortByPriority(tasks) : [...tasks];
}

/** Фильтрация по статусу (`all` возвращает все задачи). */
export function filterByStatus(
    tasks: readonly Task[],
    filter: TaskFilter,
): Task[] {
    if (filter === 'all') {
        return [...tasks];
    }

    return tasks.filter((task) => task.status === filter);
}

/** Поиск по названию или предмету без учёта регистра. Пустой запрос — все задачи. */
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

/** Просрочена ли активная задача, у которой указан `dueDate`. */
export function isTaskOverdue(task: Task, now: Date = new Date()): boolean {
    if (!task.dueDate || task.status === 'completed') {
        return false;
    }

    const deadline = parseDueDate(task.dueDate);
    return deadline !== null && deadline.getTime() < now.getTime();
}
