import { StyleSheet, Text } from 'react-native';

import Screen from '../src/components/ui/Screen';
import SegmentedControl from '../src/components/ui/SegmentedControl';
import { LabeledOption } from '../src/constants/task';
import { useTheme } from '../src/context/ThemeContext';
import { spacing } from '../src/theme/spacing';
import { ThemeName } from '../src/types/theme';

const THEME_OPTIONS: ReadonlyArray<LabeledOption<ThemeName>> = [
    { value: 'light', label: 'Светлая' },
    { value: 'dark', label: 'Тёмная' },
];

export default function SettingsScreen() {
    const { theme, colors, setTheme } = useTheme();

    return (
        <Screen>
            <Text style={[styles.label, { color: colors.secondaryText }]}>
                Тема оформления
            </Text>

            <SegmentedControl
                options={THEME_OPTIONS}
                value={theme}
                onChange={setTheme}
                stretch
                surface="card"
            />

            <Text style={[styles.hint, { color: colors.secondaryText }]}>
                Выбранная тема сохраняется и применяется при следующем запуске
                приложения.
            </Text>
        </Screen>
    );
}

const styles = StyleSheet.create({
    label: {
        fontSize: 13,
        fontWeight: '600',
        marginBottom: spacing.sm + 2,
    },
    hint: {
        marginTop: spacing.md + 2,
        fontSize: 13,
        lineHeight: 18,
    },
});
