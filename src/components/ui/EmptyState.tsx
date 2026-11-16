import { StyleSheet, Text, View } from 'react-native';
import type { LucideIcon } from 'lucide-react-native';

import { useTheme } from '../../context/ThemeContext';
import { radius, spacing } from '../../theme/spacing';
import AppButton from './AppButton';

interface EmptyStateProps {
    icon?: LucideIcon;
    title: string;
    description?: string;
    actionLabel?: string;
    onAction?: () => void;
}

export default function EmptyState({
                                       icon: Icon,
                                       title,
                                       description,
                                       actionLabel,
                                       onAction,
                                   }: EmptyStateProps) {
    const { colors } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: colors.card }]}>
            {Icon ? (
                <View style={styles.icon}>
                    <Icon size={36} color={colors.accent} strokeWidth={1.75} />
                </View>
            ) : null}

            <Text style={[styles.title, { color: colors.text }]}>{title}</Text>

            {description ? (
                <Text style={[styles.description, { color: colors.secondaryText }]}>
                    {description}
                </Text>
            ) : null}

            {actionLabel && onAction ? (
                <AppButton
                    title={actionLabel}
                    onPress={onAction}
                    style={styles.action}
                />
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'stretch',
        alignItems: 'center',
        borderRadius: radius.lg,
        padding: spacing.lg + spacing.xs,
        marginTop: spacing.sm,
    },
    icon: {
        marginBottom: spacing.sm,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        textAlign: 'center',
    },
    description: {
        fontSize: 14,
        textAlign: 'center',
        marginTop: spacing.sm - 1,
    },
    action: {
        alignSelf: 'stretch',
        marginTop: spacing.md,
    },
});
