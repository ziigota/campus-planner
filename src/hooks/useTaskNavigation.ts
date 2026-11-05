import { router } from 'expo-router';
import { useMemo } from 'react';

export interface TaskNavigation {
    openTask: (id: string) => void;
    openEditTask: (id: string) => void;
    openNewTask: () => void;
    openSettings: () => void;
    goHome: () => void;
    goBack: () => void;
}

/** Вся навигация приложения в одном месте: экраны не знают строк маршрутов. */
export function useTaskNavigation(): TaskNavigation {
    return useMemo<TaskNavigation>(
        () => ({
            openTask: (id) => router.push({ pathname: '/task/[id]', params: { id } }),
            openEditTask: (id) =>
                router.push({ pathname: '/task/edit/[id]', params: { id } }),
            openNewTask: () => router.push('/task/new'),
            openSettings: () => router.push('/settings'),
            goHome: () => router.replace('/'),
            goBack: () => router.back(),
        }),
        [],
    );
}
