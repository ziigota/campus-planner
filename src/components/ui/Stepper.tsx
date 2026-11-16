import { StyleSheet, Text, View } from 'react-native';

import { useTheme } from '../../context/ThemeContext';
import { spacing } from '../../theme/spacing';
import AppButton from './AppButton';

interface StepperProps {
    value: number;
    min: number;
    max: number;
    onChange: (value: number) => void;
}
export default function Stepper({ value, min, max, onChange }: StepperProps) {
    const { colors } = useTheme();

    return (
        <View style={styles.row}>
            <AppButton
                title="−"
                variant="secondary"
                disabled={value <= min}
                onPress={() => onChange(value - 1)}
                style={styles.button}
            />
            <Text style={[styles.value, { color: colors.text }]}>{value}</Text>
            <AppButton
                title="+"
                variant="secondary"
                disabled={value >= max}
                onPress={() => onChange(value + 1)}
                style={styles.button}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
    },
    button: {
        width: 56,
    },
    value: {
        minWidth: 40,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: '700',
    },
});
