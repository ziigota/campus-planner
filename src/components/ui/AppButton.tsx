import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';

import { useTheme } from '../../context/ThemeContext';
import { radius, spacing } from '../../theme/spacing';
import { ThemeColors } from '../../theme/colors';

export type AppButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'link';
export type AppButtonSize = 'md' | 'sm';

interface AppButtonProps {
    title: string;
    onPress: () => void;
    variant?: AppButtonVariant;
    size?: AppButtonSize;
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
}

interface Palette {
    background: string;
    pressedBackground: string;
    text: string;
}

function getPalette(colors: ThemeColors, variant: AppButtonVariant): Palette {
    switch (variant) {
        case 'primary':
            return {
                background: colors.accent,
                pressedBackground: colors.accentPressed,
                text: colors.accentText,
            };
        case 'secondary':
            return {
                background: colors.inputBackground,
                pressedBackground: colors.softPressed,
                text: colors.accent,
            };
        case 'danger':
            return {
                background: colors.danger,
                pressedBackground: colors.dangerPressed,
                text: colors.dangerText,
            };
        case 'ghost':
            return {
                background: 'transparent',
                pressedBackground: colors.softPressed,
                text: colors.secondaryText,
            };
        case 'link':
            return {
                background: 'transparent',
                pressedBackground: colors.softPressed,
                text: colors.accent,
            };
    }
}

/** Универсальная кнопка: текст и действие задаются снаружи. */
export default function AppButton({
                                      title,
                                      onPress,
                                      variant = 'primary',
                                      size = 'md',
                                      disabled = false,
                                      style,
                                  }: AppButtonProps) {
    const { colors } = useTheme();
    const palette = getPalette(colors, variant);

    return (
        <Pressable
            accessibilityRole="button"
            accessibilityState={{ disabled }}
            disabled={disabled}
            onPress={onPress}
            style={({ pressed }) => [
                styles.base,
                size === 'sm' ? styles.small : styles.medium,
                {
                    backgroundColor: pressed
                        ? palette.pressedBackground
                        : palette.background,
                },
                disabled && styles.disabled,
                style,
            ]}
        >
            <Text
                style={[
                    styles.text,
                    size === 'sm' ? styles.smallText : styles.mediumText,
                    { color: palette.text },
                ]}
            >
                {title}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    base: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    medium: {
        borderRadius: radius.md,
        paddingVertical: 14,
        paddingHorizontal: spacing.md,
    },
    small: {
        borderRadius: radius.sm,
        paddingVertical: 10,
        paddingHorizontal: spacing.md,
    },
    disabled: {
        opacity: 0.5,
    },
    text: {
        fontWeight: '700',
    },
    mediumText: {
        fontSize: 15,
    },
    smallText: {
        fontSize: 13,
    },
});
