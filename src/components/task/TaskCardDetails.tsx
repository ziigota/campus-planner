import { StyleSheet, Text, View } from 'react-native';

import { useTheme } from '../../context/ThemeContext';
import { spacing } from '../../theme/spacing';
import { Task } from '../../types/task';
import AppButton from '../ui/AppButton';

interface InfoRowProps {
    label: string;
    value: string;
    isAccent?: boolean;
    isStacked?: boolean;
}

function InfoRow({ label, value, isAccent = false, isStacked = false }: InfoRowProps) {
    const { colors } = useTheme();

    return (
        <View style={[styles.row, isStacked && styles.rowStacked]}>
            <Text style={[styles.label, { color: colors.secondaryText }]}>{label}</Text>
            <Text
                style={[
                    styles.value,
                    { color: isAccent ? colors.accent : colors.text },
                    isStacked && styles.valueStacked,
                ]}
            >
                {value}
            </Text>
        </View>
    );
}

interface TaskCardDetailsProps {
    task: Task;
    onEdit: () => void;
    onDelete: () => void;
}
export default function TaskCardDetails({ task, onEdit, onDelete }: TaskCardDetailsProps) {
    const { colors } = useTheme();

    return (
        <View style={[styles.container, { borderTopColor: colors.cardBorder }]}>
            <InfoRow label="Упражнение" value={task.subject} isAccent />
            <InfoRow label="Длительность" value={`${task.durationMinutes} мин.`} />
            <InfoRow
                label="Заметка"
                value={task.note ? task.note : 'Заметки нет'}
                isStacked
            />

            <View style={styles.actions}>
                <AppButton
                    title="Редактировать"
                    variant="secondary"
                    size="sm"
                    onPress={onEdit}
                    style={styles.action}
                />
                <AppButton
                    title="Удалить"
                    variant="danger"
                    size="sm"
                    onPress={onDelete}
                    style={styles.action}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderTopWidth: 1,
        paddingHorizontal: spacing.md,
        paddingTop: spacing.sm + spacing.xs,
        paddingBottom: spacing.md,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: spacing.md,
        paddingVertical: spacing.xs + 1,
    },
    rowStacked: {
        flexDirection: 'column',
        gap: spacing.xs,
    },
    label: {
        fontSize: 13,
    },
    value: {
        flexShrink: 1,
        fontSize: 13,
        fontWeight: '600',
        textAlign: 'right',
    },
    valueStacked: {
        textAlign: 'left',
        fontWeight: '500',
    },
    actions: {
        flexDirection: 'row',
        gap: spacing.sm,
        marginTop: spacing.sm + spacing.xs,
    },
    action: {
        flex: 1,
    },
});
