import AsyncStorage from '@react-native-async-storage/async-storage';

import { MAX_WEEKLY_GOAL, MIN_WEEKLY_GOAL } from '../constants/goal';

const GOAL_STORAGE_KEY = '@campus-planner/weekly-goal';

export async function getStoredGoal(): Promise<number | null> {
    try {
        const value = await AsyncStorage.getItem(GOAL_STORAGE_KEY);
        if (value === null) {
            return null;
        }

        const goal = Number.parseInt(value, 10);
        const isValid =
            Number.isInteger(goal) && goal >= MIN_WEEKLY_GOAL && goal <= MAX_WEEKLY_GOAL;

        return isValid ? goal : null;
    } catch (error) {
        console.warn('Не удалось прочитать недельную цель', error);
        return null;
    }
}

export async function setStoredGoal(goal: number): Promise<void> {
    try {
        await AsyncStorage.setItem(GOAL_STORAGE_KEY, String(goal));
    } catch (error) {
        console.warn('Не удалось сохранить недельную цель', error);
    }
}
