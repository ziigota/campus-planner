import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

import { useTheme } from '../../context/ThemeContext';
import { radius, spacing } from '../../theme/spacing';

interface AppInputProps extends TextInputProps {
    label?: string;
    error?: string;
}

/** Подпись, поле ввода и сообщение об ошибке. */
export default function AppInput({
                                     label,
                                     error,
                                     style,
                                     ...inputProps
                                 }: AppInputProps) {
    const { colors } = useTheme();

    return (
        <View style={styles.wrapper}>
            {label ? (
                <Text style={[styles.label, { color: colors.secondaryText }]}>
                    {label}
                </Text>
            ) : null}

            <TextInput
                placeholderTextColor={colors.secondaryText}
                {...inputProps}
                style={[
                    styles.input,
                    {
                        borderColor: error ? colors.dangerText : colors.inputBorder,
                        backgroundColor: colors.inputBackground,
                        color: colors.text,
                    },
                    style,
                ]}
            />

            {error ? (
                <Text style={[styles.error, { color: colors.dangerText }]}>
                    {error}
                </Text>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: spacing.sm + spacing.xs,
    },
    label: {
        fontSize: 13,
        fontWeight: '600',
        marginBottom: spacing.xs + 2,
    },
    input: {
        height: 46,
        borderWidth: 1,
        borderRadius: radius.md - 2,
        paddingHorizontal: spacing.sm + spacing.xs,
    },
    error: {
        fontSize: 12,
        marginTop: spacing.xs,
    },
});
