import { StyleSheet, Text } from 'react-native';

import { useTheme } from '../../context/ThemeContext';
import { radius, spacing } from '../../theme/spacing';

interface BadgeProps {
    label: string;
    tone?: 'neutral' | 'danger';
}

export default function Badge({ label, tone = 'neutral' }: BadgeProps) {
    const { colors } = useTheme();

    const isDanger = tone === 'danger';

    return (
        <Text
            style={[
                styles.badge,
                {
                    color: isDanger ? colors.dangerText : colors.secondaryText,
                    backgroundColor: isDanger ? colors.danger : colors.inputBackground,
                },
            ]}
        >
            {label}
        </Text>
    );
}

const styles = StyleSheet.create({
    badge: {
        paddingHorizontal: spacing.sm + 1,
        paddingVertical: spacing.xs + 1,
        borderRadius: radius.sm,
        overflow: 'hidden',
        fontSize: 12,
    },
});
