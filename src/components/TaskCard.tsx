import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { Task } from '../types/task';

interface TaskCardProps {
    task: Task;
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
                                     onToggle,
                                     onDelete,
                                 }: TaskCardProps) {
    const handleDelete = () => {
        Alert.alert(
            'Удалить тренировку?',
            `Тренировка «${task.title}» будет удалена.`,
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
        <View style={[styles.card, task.isCompleted && styles.completedCard]}>
            <View style={styles.content}>
                <Text
                    style={[
                        styles.title,
                        task.isCompleted && styles.completedTitle,
                    ]}
                >
                    {task.title}
                </Text>

                <Text style={styles.type}>{task.subject}</Text>

                <View style={styles.details}>
                    <Text style={styles.duration}>
                        {task.durationMinutes} мин.
                    </Text>
                    <Text style={styles.priority}>
                        {priorityNames[task.priority]}
                    </Text>
                </View>

                <Text style={styles.status}>
                    {task.isCompleted ? 'Выполнено' : 'Активна'}
                </Text>
            </View>

            <View style={styles.actions}>
                <Pressable
                    style={styles.completeButton}
                    onPress={() => onToggle(task.id)}
                >
                    <Text style={styles.completeButtonText}>
                        {task.isCompleted ? 'Вернуть' : 'Выполнить'}
                    </Text>
                </Pressable>

                <Pressable style={styles.deleteButton} onPress={handleDelete}>
                    <Text style={styles.deleteButtonText}>Удалить</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#E4D9ED',
    },
    completedCard: {
        opacity: 0.62,
        backgroundColor: '#F1ECF5',
    },
    content: {
        flex: 1,
    },
    title: {
        color: '#2D174A',
        fontSize: 18,
        fontWeight: '700',
    },
    completedTitle: {
        textDecorationLine: 'line-through',
    },
    type: {
        color: '#6F3FA3',
        fontSize: 14,
        fontWeight: '600',
        marginTop: 5,
    },
    details: {
        flexDirection: 'row',
        marginTop: 10,
        gap: 8,
    },
    duration: {
        color: '#65556E',
        backgroundColor: '#EEE7F4',
        paddingHorizontal: 9,
        paddingVertical: 5,
        borderRadius: 8,
        fontSize: 12,
    },
    priority: {
        color: '#65556E',
        backgroundColor: '#EEE7F4',
        paddingHorizontal: 9,
        paddingVertical: 5,
        borderRadius: 8,
        fontSize: 12,
    },
    status: {
        color: '#806A8D',
        fontSize: 12,
        marginTop: 9,
    },
    actions: {
        flexDirection: 'row',
        marginTop: 14,
        gap: 8,
    },
    completeButton: {
        flex: 1,
        backgroundColor: '#E8DDF0',
        borderRadius: 10,
        paddingVertical: 10,
        alignItems: 'center',
    },
    completeButtonText: {
        color: '#5C3288',
        fontSize: 13,
        fontWeight: '700',
    },
    deleteButton: {
        flex: 1,
        backgroundColor: '#F2E8F5',
        borderRadius: 10,
        paddingVertical: 10,
        alignItems: 'center',
    },
    deleteButtonText: {
        color: '#8B4A91',
        fontSize: 13,
        fontWeight: '700',
    },
});
