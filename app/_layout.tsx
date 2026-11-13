import { ActivityIndicator } from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Screen from '../src/components/ui/Screen';
import { GoalProvider } from '../src/context/GoalContext';
import { TasksProvider } from '../src/context/TasksContext';
import { ThemeProvider, useTheme } from '../src/context/ThemeContext';

function RootNavigator() {
    const { colors, isLoading } = useTheme();

    if (isLoading) {
        return (
            <Screen centered>
                <ActivityIndicator size="large" color={colors.accent} />
            </Screen>
        );
    }

    return (
        <Stack
            screenOptions={{
                headerStyle: { backgroundColor: colors.card },
                headerTintColor: colors.text,
                contentStyle: { backgroundColor: colors.background },
            }}
        >
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

export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <ThemeProvider>
                <TasksProvider>
                    <GoalProvider>
                        <RootNavigator />
                    </GoalProvider>
                </TasksProvider>
            </ThemeProvider>
        </SafeAreaProvider>
    );
}
