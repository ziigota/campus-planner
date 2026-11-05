import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

import { PRIORITY_LABELS, STATUS_LABELS } from '../../constants/task';
import { useTheme } from '../../context/ThemeContext';
import { radius, spacing } from '../../theme/spacing';
import { Task } from '../../types/task';
import { formatDueDate } from '../../utils/date';
import { isTaskOverdue } from '../../utils/task';
import AppButton from '../ui/AppButton';
import Badge from '../ui/Badge';

interface TaskCardProps {
    task: Task;
    onPress: (id: string) => void;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}

export default function TaskCard({
                                     task,
                                     onPress,
                                     onToggle,
                                     onDelete,
                                 }: TaskCardProps) {
    const { colors } = useTheme();

    const isCompleted = task.status === 'completed';
    const isOverdue = isTaskOverdue(task);

    const handleDelete = () => {
        Alert.alert(
            'Удалить задачу?',
            `Задача «${task.title}» будет удалена.`,
            [
                { text: 'Отмена', style: 'cancel' },
                {
                    text: 'Удалить',
                    style: 'destructive',
                    onPress: () => onDelete(task.id),
                },
            ],
        );
    };

    return (
        <Pressable
            onPress={() => onPress(task.id)}
            style={({ pressed }) => [
                styles.card,
                {
                    backgroundColor: pressed ? colors.cardPressed : colors.card,
                    borderColor: colors.cardBorder,
                },
                isCompleted && styles.completedCard,
            ]}
        >
            <View style={styles.content}>
                <Text
                    style={[
                        styles.title,
                        { color: colors.text },
                        isCompleted && styles.completedTitle,
                    ]}
                >
                    {task.title}
                </Text>

                <Text style={[styles.subject, { color: colors.accent }]}>
                    {task.subject}
                </Text>

                <View style={styles.details}>
                    <Badge label={`${task.durationMinutes} мин.`} />
                    <Badge label={PRIORITY_LABELS[task.priority]} />
                    {task.dueDate ? (
                        <Badge label={`до ${formatDueDate(task.dueDate)}`} />
                    ) : null}
                    {isOverdue ? <Badge label="Просрочено" tone="danger" /> : null}
                </View>

                <Text style={[styles.status, { color: colors.secondaryText }]}>
                    {STATUS_LABELS[task.status]}
                </Text>
            </View>

            <View style={styles.actions}>
                <AppButton
                    title={isCompleted ? 'Вернуть' : 'Выполнить'}
                    variant="secondary"
                    size="sm"
                    onPress={() => onToggle(task.id)}
                    style={styles.action}
                />
                <AppButton
                    title="Удалить"
                    variant="danger"
                    size="sm"
                    onPress={handleDelete}
                    style={styles.action}
                />
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: radius.lg,
        padding: spacing.md,
        marginBottom: spacing.md - 4,
        borderWidth: 1,
    },
    completedCard: {
        opacity: 0.62,
    },
    content: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
    },
    completedTitle: {
        textDecorationLine: 'line-through',
    },
    subject: {
        fontSize: 14,
        fontWeight: '600',
        marginTop: spacing.xs + 1,
    },
    details: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: spacing.sm + 2,
        gap: spacing.sm,
    },
    status: {
        fontSize: 12,
        marginTop: spacing.sm + 1,
    },
    actions: {
        flexDirection: 'row',
        marginTop: spacing.md - 2,
        gap: spacing.sm,
    },
    action: {
        flex: 1,
    },
});
