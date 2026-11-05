import { useCallback, useMemo, useState } from 'react';

import { Task, TaskCounts, TaskFilter, TaskSortMode } from '../types/task';
import {
    countTasks,
    filterByStatus,
    filterTasks,
    sortTasks,
} from '../utils/task';
import { useTasks } from './useTasks';

export interface TaskListState {
    visibleTasks: Task[];
    counts: TaskCounts;
    filter: TaskFilter;
    setFilter: (filter: TaskFilter) => void;
    query: string;
    setQuery: (query: string) => void;
    sortMode: TaskSortMode;
    setSortMode: (mode: TaskSortMode) => void;
    hasActiveFilters: boolean;
    resetFilters: () => void;
}

/** Состояние списка задач: фильтр, поиск, сортировка и итоговая выборка. */
export function useTaskList(): TaskListState {
    const { tasks } = useTasks();

    const [filter, setFilter] = useState<TaskFilter>('all');
    const [query, setQuery] = useState('');
    const [sortMode, setSortMode] = useState<TaskSortMode>('created');

    const counts = useMemo(() => countTasks(tasks), [tasks]);

    const visibleTasks = useMemo(
        () => sortTasks(filterTasks(filterByStatus(tasks, filter), query), sortMode),
        [tasks, filter, query, sortMode],
    );

    const resetFilters = useCallback(() => {
        setFilter('all');
        setQuery('');
    }, []);

    return {
        visibleTasks,
        counts,
        filter,
        setFilter,
        query,
        setQuery,
        sortMode,
        setSortMode,
        hasActiveFilters: filter !== 'all' || query.trim().length > 0,
        resetFilters,
    };
}
