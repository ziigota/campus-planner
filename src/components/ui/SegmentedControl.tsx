import { Pressable, StyleSheet, Text, View } from 'react-native';

import { LabeledOption } from '../../constants/task';
import { useTheme } from '../../context/ThemeContext';
import { radius, spacing } from '../../theme/spacing';

interface SegmentedControlProps<T extends string> {
    options: ReadonlyArray<LabeledOption<T>>;
    value: T;
    onChange: (value: T) => void;
    /** Растягивает варианты на всю ширину строки поровну. */
    stretch?: boolean;
    /** Фон невыбранных вариантов: поле ввода или карточка. */
    surface?: 'input' | 'card';
}

/** Выбор одного значения из нескольких (фильтры, приоритет, тема). */
export default function SegmentedControl<T extends string>({
                                                               options,
                                                               value,
                                                               onChange,
                                                               stretch = false,
                                                               surface = 'input',
                                                           }: SegmentedControlProps<T>) {
    const { colors } = useTheme();
    const onCard = surface === 'card';

    return (
        <View style={styles.row}>
            {options.map((option) => {
                const selected = option.value === value;

                const idleBackground = onCard ? colors.card : colors.inputBackground;
                const idlePressed = onCard ? colors.cardPressed : colors.softPressed;

                return (
                    <Pressable
                        key={option.value}
                        accessibilityRole="button"
                        accessibilityState={{ selected }}
                        onPress={() => onChange(option.value)}
                        style={({ pressed }) => [
                            styles.option,
                            stretch && styles.stretch,
                            {
                                borderColor: onCard ? colors.cardBorder : 'transparent',
                                backgroundColor: selected
                                    ? pressed
                                        ? colors.accentPressed
                                        : colors.accent
                                    : pressed
                                        ? idlePressed
                                        : idleBackground,
                            },
                        ]}
                    >
                        <Text
                            style={[
                                styles.text,
                                {
                                    color: selected
                                        ? colors.accentText
                                        : onCard
                                            ? colors.text
                                            : colors.secondaryText,
                                },
                            ]}
                        >
                            {option.label}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.sm,
    },
    option: {
        borderWidth: 1,
        borderRadius: radius.md,
        paddingVertical: spacing.sm + 1,
        paddingHorizontal: spacing.md - 2,
        alignItems: 'center',
    },
    stretch: {
        flex: 1,
    },
    text: {
        fontSize: 13,
        fontWeight: '700',
    },
});
