import { Stack } from 'expo-router';

import { useStackScreenOptions } from '../../src/hooks/useStackScreenOptions';

export default function AuthLayout() {
    const screenOptions = useStackScreenOptions();

    return (
        <Stack screenOptions={screenOptions}>
            <Stack.Screen name="login" options={{ title: 'Вход' }} />
        </Stack>
    );
}
