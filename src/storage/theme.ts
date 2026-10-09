import AsyncStorage from '@react-native-async-storage/async-storage';

export type ThemeName = 'light' | 'dark';

const THEME_STORAGE_KEY = '@campus-planner/theme';

export async function getStoredTheme(): Promise<ThemeName | null> {
    try {
        const value = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (value === 'light' || value === 'dark') {
            return value;
        }
        return null;
    } catch (error) {
        console.warn('Не удалось прочитать сохранённую тему', error);
        return null;
    }
}

export async function setStoredTheme(theme: ThemeName): Promise<void> {
    try {
        await AsyncStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (error) {
        console.warn('Не удалось сохранить тему', error);
    }
}
