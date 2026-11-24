import { ActivityIndicator } from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { AuthProvider, useAuth } from '../src/auth/AuthContext';
import Screen from '../src/components/ui/Screen';
import { GoalProvider } from '../src/context/GoalContext';
import { TasksProvider } from '../src/context/TasksContext';
import { ThemeProvider, useTheme } from '../src/context/ThemeContext';

function RootNavigator() {
    const { colors, isLoading: isThemeLoading } = useTheme();
    const { isAuthenticated, isLoading: isAuthLoading } = useAuth();

    if (isThemeLoading || isAuthLoading) {
        return (
            <Screen centered>
                <ActivityIndicator size="large" color={colors.accent} />
            </Screen>
        );
    }

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Protected guard={isAuthenticated}>
                <Stack.Screen name="(app)" />
            </Stack.Protected>
            <Stack.Protected guard={!isAuthenticated}>
                <Stack.Screen name="(auth)" />
            </Stack.Protected>
        </Stack>
    );
}

export default function RootLayout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider>
                <ThemeProvider>
                    <AuthProvider>
                        <TasksProvider>
                            <GoalProvider>
                                <RootNavigator />
                            </GoalProvider>
                        </TasksProvider>
                    </AuthProvider>
                </ThemeProvider>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
}
