import { useMemo } from 'react';

import { useTheme } from '../context/ThemeContext';

export function useStackScreenOptions() {
    const { colors } = useTheme();

    return useMemo(
        () => ({
            headerStyle: { backgroundColor: colors.card },
            headerTintColor: colors.text,
            contentStyle: { backgroundColor: colors.background },
        }),
        [colors],
    );
}
