import { Stack } from 'expo-router';

import { useStackScreenOptions } from '../../src/hooks/useStackScreenOptions';

export default function AppLayout() {
    const screenOptions = useStackScreenOptions();

    return (
        <Stack screenOptions={screenOptions}>
            <Stack.Screen name="index" options={{ title: 'Задачи' }} />
            <Stack.Screen name="task/new" options={{ title: 'Новая задача' }} />
            <Stack.Screen name="task/[id]" options={{ title: 'Детали задачи' }} />
            <Stack.Screen
                name="task/edit/[id]"
                options={{ title: 'Редактирование' }}
            />
            <Stack.Screen name="settings" options={{ title: 'Настройки' }} />
        </Stack>
    );
}
