import { StyleSheet, Text, View } from 'react-native';

import { PRIORITY_LABELS, STATUS_LABELS } from '../../constants/task';
import { useTheme } from '../../context/ThemeContext';
import { radius, spacing } from '../../theme/spacing';
import { Task } from '../../types/task';
import { formatDueDate } from '../../utils/date';
import { isTaskOverdue } from '../../utils/task';

interface DetailRowProps {
    label: string;
    value: string;
    isWarning?: boolean;
}

function DetailRow({ label, value, isWarning = false }: DetailRowProps) {
    const { colors } = useTheme();

    return (
        <View style={styles.row}>
            <Text style={{ color: colors.secondaryText }}>{label}</Text>
            <Text
                style={{
                    color: isWarning ? colors.dangerText : colors.text,
                    fontWeight: '600',
                }}
            >
                {value}
            </Text>
        </View>
    );
}

export default function TaskDetails({ task }: { task: Task }) {
    const { colors } = useTheme();
    const isOverdue = isTaskOverdue(task);

    return (
        <View
            style={[
                styles.card,
                { backgroundColor: colors.card, borderColor: colors.cardBorder },
            ]}
        >
            <Text style={[styles.title, { color: colors.text }]}>{task.title}</Text>
            <Text style={[styles.subject, { color: colors.accent }]}>
                {task.subject}
            </Text>

            <DetailRow label="Длительность:" value={`${task.durationMinutes} мин.`} />
            <DetailRow label="Приоритет:" value={PRIORITY_LABELS[task.priority]} />
            {task.dueDate ? (
                <DetailRow
                    label="Срок:"
                    value={
                        isOverdue
                            ? `${formatDueDate(task.dueDate)} (просрочено)`
                            : formatDueDate(task.dueDate)
                    }
                    isWarning={isOverdue}
                />
            ) : null}
            <DetailRow label="Статус:" value={STATUS_LABELS[task.status]} />
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: radius.xl,
        borderWidth: 1,
        padding: spacing.md + 2,
        marginBottom: spacing.md,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
    },
    subject: {
        fontSize: 15,
        fontWeight: '600',
        marginTop: spacing.sm - 2,
        marginBottom: spacing.md - 2,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: spacing.sm - 2,
    },
});
