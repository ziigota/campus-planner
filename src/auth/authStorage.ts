import * as SecureStore from 'expo-secure-store';

const ACCESS_TOKEN_KEY = 'campus-planner.access-token';

export async function saveToken(token: string): Promise<void> {
    try {
        await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, token);
    } catch {
        console.warn('Не удалось сохранить токен в защищённом хранилище');
    }
}

export async function readToken(): Promise<string | null> {
    try {
        return await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
    } catch {
        console.warn('Не удалось прочитать токен из защищённого хранилища');
        return null;
    }
}

export async function removeToken(): Promise<void> {
    try {
        await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
    } catch {
        console.warn('Не удалось удалить токен из защищённого хранилища');
    }
}
