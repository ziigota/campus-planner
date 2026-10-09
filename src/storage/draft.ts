import AsyncStorage from '@react-native-async-storage/async-storage';
import { TaskDraft } from '../types/task';

const DRAFT_STORAGE_KEY = '@campus-planner/task-draft';

export async function getDraft(): Promise<TaskDraft | null> {
    try {
        const raw = await AsyncStorage.getItem(DRAFT_STORAGE_KEY);
        if (!raw) {
            return null;
        }
        return JSON.parse(raw) as TaskDraft;
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
