import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { Task } from '../types/task';
import { useTheme } from '../context/ThemeContext';

interface TaskCardProps {
    task: Task;
    onPress: (id: string) => void;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}

const priorityNames: Record<Task['priority'], string> = {
    low: 'Низкая',
    medium: 'Средняя',
    high: 'Высокая',
};

export default function TaskCard({
                                     task,
                                     onPress,
                                     onToggle,
                                     onDelete,
                                 }: TaskCardProps) {
    const { colors } = useTheme();

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
                task.isCompleted && { opacity: 0.62 },
            ]}
        >
            <View style={styles.content}>
                <Text
                    style={[
                        styles.title,
                        { color: colors.text },
                        task.isCompleted && styles.completedTitle,
                    ]}
                >
                    {task.title}
                </Text>

                <Text style={[styles.type, { color: colors.accent }]}>
                    {task.subject}
                </Text>

                <View style={styles.details}>
                    <Text
                        style={[
                            styles.badge,
                            {
                                color: colors.secondaryText,
                                backgroundColor: colors.inputBackground,
                            },
                        ]}
                    >
                        {task.durationMinutes} мин.
                    </Text>
                    <Text
                        style={[
                            styles.badge,
                            {
                                color: colors.secondaryText,
                                backgroundColor: colors.inputBackground,
                            },
                        ]}
                    >
                        {priorityNames[task.priority]}
                    </Text>
                </View>

                <Text style={[styles.status, { color: colors.secondaryText }]}>
                    {task.isCompleted ? 'Выполнено' : 'Активна'}
                </Text>
            </View>

            <View style={styles.actions}>
                <Pressable
                    style={({ pressed }) => [
                        styles.actionButton,
                        {
                            backgroundColor: pressed
                                ? colors.softPressed
                                : colors.inputBackground,
                        },
                    ]}
                    onPress={() => onToggle(task.id)}
                >
                    <Text style={[styles.actionText, { color: colors.accent }]}>
                        {task.isCompleted ? 'Вернуть' : 'Выполнить'}
                    </Text>
                </Pressable>

                <Pressable
                    style={({ pressed }) => [
                        styles.actionButton,
                        {
                            backgroundColor: pressed
                                ? colors.dangerPressed
                                : colors.danger,
                        },
                    ]}
                    onPress={handleDelete}
                >
                    <Text style={[styles.actionText, { color: colors.dangerText }]}>
                        Удалить
                    </Text>
                </Pressable>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
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
    type: {
        fontSize: 14,
        fontWeight: '600',
        marginTop: 5,
    },
    details: {
        flexDirection: 'row',
        marginTop: 10,
        gap: 8,
    },
    badge: {
        paddingHorizontal: 9,
        paddingVertical: 5,
        borderRadius: 8,
        fontSize: 12,
    },
    status: {
        fontSize: 12,
        marginTop: 9,
    },
    actions: {
        flexDirection: 'row',
        marginTop: 14,
        gap: 8,
    },
    actionButton: {
        flex: 1,
        borderRadius: 10,
        paddingVertical: 10,
        alignItems: 'center',
    },
    actionText: {
        fontSize: 13,
        fontWeight: '700',
    },
});
