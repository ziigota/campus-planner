import { StyleSheet, Text, View } from 'react-native';

import { useTheme } from '../../context/ThemeContext';
import { radius, spacing } from '../../theme/spacing';
import AppButton from './AppButton';

interface EmptyStateProps {
    /** Эмодзи или короткий символ над заголовком. */
    icon?: string;
    title: string;
    description?: string;
    actionLabel?: string;
    onAction?: () => void;
}

/** Заглушка для пустых списков и «не найдено»: иконка, заголовок, описание, действие. */
export default function EmptyState({
                                       icon,
                                       title,
                                       description,
                                       actionLabel,
                                       onAction,
                                   }: EmptyStateProps) {
    const { colors } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: colors.card }]}>
            {icon ? <Text style={styles.icon}>{icon}</Text> : null}

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
        fontSize: 32,
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
