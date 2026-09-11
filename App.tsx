import { useState } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import TaskCard from './src/components/TaskCard';
import TaskForm from './src/components/TaskForm';

import { Task, TaskFilter } from './src/types/task';

const initialTasks: Task[] = [
    {
        id: '1',
        title: 'Утренняя пробежка',
        subject: 'Кардио',
        durationMinutes: 30,
        priority: 'medium',
        isCompleted: true,
    },
    {
        id: '2',
        title: 'Силовая тренировка',
        subject: 'Силовая',
        durationMinutes: 45,
        priority: 'high',
        isCompleted: false,
    },
    {
        id: '3',
        title: 'Растяжка',
        subject: 'Растяжка',
        durationMinutes: 20,
        priority: 'low',
        isCompleted: false,
    },
    {
        id: '4',
        title: 'Велотренировка',
        subject: 'Кардио',
        durationMinutes: 40,
        priority: 'medium',
        isCompleted: true,
    },
];

export default function App() {
    const [tasks, setTasks] = useState<Task[]>(initialTasks);
    const [filter, setFilter] = useState<TaskFilter>('all');

    const completedCount = tasks.filter((task) => task.isCompleted).length;

    const filteredTasks = tasks.filter((task) => {
        if (filter === 'active') {
            return !task.isCompleted;
        }

        if (filter === 'completed') {
            return task.isCompleted;
        }

        return true;
    });

    const addTask = (
        title: string,
        subject: string,
        durationMinutes: number,
        priority: Task['priority'],
    ) => {
        const newTask: Task = {
            id: String(Date.now()),
            title: title.trim(),
            subject: subject.trim(),
            durationMinutes,
            priority,
            isCompleted: false,
        };

        setTasks((currentTasks) => [newTask, ...currentTasks]);
    };
    const toggleTask = (id: string) => {
        setTasks((currentTasks) =>
            currentTasks.map((task) =>
                task.id === id
                    ? { ...task, isCompleted: !task.isCompleted }
                    : task,
            ),
        );
    };
    const deleteTask = (id: string) => {
        setTasks((currentTasks) =>
            currentTasks.filter((task) => task.id !== id),
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={filteredTasks}
                renderItem={({ item }) => (
                    <TaskCard
                        task={item}
                        onToggle={toggleTask}
                        onDelete={deleteTask}
                    />
                )}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={
                    <View>
                        <Text style={styles.title}>Activity Tracker</Text>
                        <Text style={styles.subtitle}>
                            Планируйте тренировки и следите за активностью
                        </Text>

                        <View style={styles.statsCard}>
                            <View>
                                <Text style={styles.statsLabel}>Всего тренировок</Text>
                                <Text style={styles.statsValue}>{tasks.length}</Text>
                            </View>

                            <View style={styles.statsDivider} />

                            <View>
                                <Text style={styles.statsLabel}>Выполнено</Text>
                                <Text style={styles.statsValue}>{completedCount}</Text>
                            </View>
                        </View>

                        <TaskForm onAdd={addTask} />

                        <View style={styles.filterContainer}>
                            <Text style={styles.sectionTitle}>Тренировки</Text>

                            <View style={styles.filters}>
                                <Text
                                    style={[
                                        styles.filter,
                                        filter === 'all' && styles.activeFilter,
                                    ]}
                                    onPress={() => setFilter('all')}
                                >
                                    Все
                                </Text>

                                <Text
                                    style={[
                                        styles.filter,
                                        filter === 'active' && styles.activeFilter,
                                    ]}
                                    onPress={() => setFilter('active')}
                                >
                                    Активные
                                </Text>

                                <Text
                                    style={[
                                        styles.filter,
                                        filter === 'completed' && styles.activeFilter,
                                    ]}
                                    onPress={() => setFilter('completed')}
                                >
                                    Выполненные
                                </Text>
                            </View>
                        </View>
                    </View>
                }
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyTitle}>Список пока пуст</Text>
                        <Text style={styles.emptyText}>
                            Добавьте тренировку или выберите другой фильтр.
                        </Text>
                    </View>
                }
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F1FA',
    },
    listContent: {
        padding: 20,
        paddingBottom: 32,
    },
    title: {
        color: '#2D174A',
        fontSize: 30,
        fontWeight: '700',
        marginTop: 8,
    },
    subtitle: {
        color: '#756580',
        fontSize: 14,
        marginTop: 5,
        marginBottom: 18,
    },
    statsCard: {
        backgroundColor: '#6F3FA3',
        borderRadius: 18,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    statsLabel: {
        color: '#EDE3F8',
        fontSize: 13,
    },
    statsValue: {
        color: '#FFFFFF',
        fontSize: 26,
        fontWeight: '700',
        marginTop: 3,
    },
    statsDivider: {
        width: 1,
        height: 42,
        backgroundColor: '#B99BD2',
        marginHorizontal: 32,
    },
    filterContainer: {
        marginTop: 22,
        marginBottom: 12,
    },
    sectionTitle: {
        color: '#2D174A',
        fontSize: 21,
        fontWeight: '700',
        marginBottom: 12,
    },
    filters: {
        flexDirection: 'row',
        gap: 8,
    },
    filter: {
        color: '#684A7D',
        backgroundColor: '#E9DDF2',
        paddingVertical: 9,
        paddingHorizontal: 14,
        borderRadius: 12,
        overflow: 'hidden',
        fontSize: 13,
        fontWeight: '600',
    },
    activeFilter: {
        color: '#FFFFFF',
        backgroundColor: '#6F3FA3',
    },
    emptyContainer: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 28,
        marginTop: 8,
    },
    emptyTitle: {
        color: '#2D174A',
        fontSize: 18,
        fontWeight: '700',
    },
    emptyText: {
        color: '#756580',
        fontSize: 14,
        textAlign: 'center',
        marginTop: 7,
    },
});
