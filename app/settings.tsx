import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../src/context/ThemeContext';
import { ThemeName } from '../src/storage/theme';

const options: { value: ThemeName; label: string }[] = [
    { value: 'light', label: 'Светлая' },
    { value: 'dark', label: 'Тёмная' },
];

export default function SettingsScreen() {
    const { theme, colors, setTheme } = useTheme();

    return (
        <View style={[styles.screen, { backgroundColor: colors.background }]}>
            <Text style={[styles.label, { color: colors.secondaryText }]}>
                Тема оформления
            </Text>

            <View style={styles.optionsRow}>
                {options.map((option) => {
                    const selected = theme === option.value;
                    return (
                        <Pressable
                            key={option.value}
                            style={({ pressed }) => [
                                styles.optionButton,
                                {
                                    backgroundColor: selected
                                        ? pressed
                                            ? colors.accentPressed
                                            : colors.accent
                                        : pressed
                                            ? colors.cardPressed
                                            : colors.card,
                                    borderColor: colors.cardBorder,
                                },
                            ]}
                            onPress={() => setTheme(option.value)}
                        >
                            <Text
                                style={{
                                    color: selected ? colors.accentText : colors.text,
                                    fontWeight: '700',
                                }}
                            >
                                {option.label}
                            </Text>
                        </Pressable>
                    );
                })}
            </View>

            <Text style={[styles.hint, { color: colors.secondaryText }]}>
                Выбранная тема сохраняется и применяется при следующем запуске
                приложения.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 16,
    },
    label: {
        fontSize: 13,
        fontWeight: '600',
        marginBottom: 10,
    },
    optionsRow: {
        flexDirection: 'row',
        gap: 10,
    },
    optionButton: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
    },
    hint: {
        marginTop: 18,
        fontSize: 13,
        lineHeight: 18,
    },
});
