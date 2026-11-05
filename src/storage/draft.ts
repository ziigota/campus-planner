import AsyncStorage from '@react-native-async-storage/async-storage';

import { TaskDraft } from '../types/task';
import { isTaskPriority } from '../utils/task';

const DRAFT_STORAGE_KEY = '@campus-planner/task-draft';

function parseDraft(value: unknown): TaskDraft | null {
    if (typeof value !== 'object' || value === null) {
        return null;
    }

    const record = value as Record<string, unknown>;
    const { title, subject, duration, dueDate, priority } = record;

    if (
        typeof title !== 'string' ||
        typeof subject !== 'string' ||
        typeof duration !== 'string' ||
        !isTaskPriority(priority)
    ) {
        return null;
    }

    return {
        title,
        subject,
        duration,
        dueDate: typeof dueDate === 'string' ? dueDate : '',
        priority,
    };
}

export async function getDraft(): Promise<TaskDraft | null> {
    try {
        const raw = await AsyncStorage.getItem(DRAFT_STORAGE_KEY);
        if (!raw) {
            return null;
        }
        const parsed: unknown = JSON.parse(raw);
        return parseDraft(parsed);
    } catch (error) {
        console.warn('Не удалось прочитать черновик задачи', error);
        return null;
    }
}

export async function saveDraft(draft: TaskDraft): Promise<void> {
    try {
        await AsyncStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
    } catch (error) {
        console.warn('Не удалось сохранить черновик задачи', error);
    }
}

export async function clearDraft(): Promise<void> {
    try {
        await AsyncStorage.removeItem(DRAFT_STORAGE_KEY);
    } catch (error) {
        console.warn('Не удалось удалить черновик задачи', error);
    }
}
