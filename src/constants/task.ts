import { TaskFilter, TaskPriority, TaskSortMode, TaskStatus } from '../types/task';

export interface LabeledOption<T extends string> {
    value: T;
    label: string;
}

export const PRIORITY_LABELS: Record<TaskPriority, string> = {
    low: 'Низкая',
    medium: 'Средняя',
    high: 'Высокая',
};

export const STATUS_LABELS: Record<TaskStatus, string> = {
    active: 'Активна',
    completed: 'Выполнено',
};

export const PRIORITY_OPTIONS: ReadonlyArray<LabeledOption<TaskPriority>> = [
    { value: 'low', label: PRIORITY_LABELS.low },
    { value: 'medium', label: PRIORITY_LABELS.medium },
    { value: 'high', label: PRIORITY_LABELS.high },
];

export const FILTER_OPTIONS: ReadonlyArray<LabeledOption<TaskFilter>> = [
    { value: 'all', label: 'Все' },
    { value: 'active', label: 'Активные' },
    { value: 'completed', label: 'Выполненные' },
];

export const SORT_OPTIONS: ReadonlyArray<LabeledOption<TaskSortMode>> = [
    { value: 'created', label: 'По добавлению' },
    { value: 'priority', label: 'По приоритету' },
];
