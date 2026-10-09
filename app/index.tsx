import { useLayoutEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { router, useNavigation } from 'expo-router';
import { useTheme } from '../src/context/ThemeContext';
import { useTasks } from '../src/context/TasksContext';
import TaskCard from '../src/components/TaskCard';
import { TaskFilter } from '../src/types/task';


const FILTER_OPTIONS: { value: TaskFilter; label: string }[] = [
    { value: 'all', label: 'Все' },
    { value: 'active', label: 'Активные' },
    { value: 'completed', label: 'Выполненные' },
];

export default function TaskListScreen() {
    const { colors } = useTheme();
    const { tasks, toggleTask, deleteTask } = useTasks();
    const navigation = useNavigation();

    const [filter, setFilter] = useState<TaskFilter>('all');

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Pressable
                    onPress={() => router.push('/settings')}
                    hitSlop={8}
                    style={({ pressed }) => [
                        styles.headerButton,
                        pressed && { backgroundColor: colors.softPressed },
                    ]}
                >
                    {({ pressed }) => (
                        <Text
                            style={{
                                color: pressed ? colors.accentPressed : colors.accent,
                                fontWeight: '700',
                            }}
                        >
                            Настройки
                        </Text>
                    )}
                </Pressable>
            ),
        });
    }, [navigation, colors]);

    const completedCount = tasks.filter((task) => task.isCompleted).length;

    const filteredTasks = tasks.filter((task) => {
        if (filter === 'active') return !task.isCompleted;
        if (filter === 'completed') return task.isCompleted;
        return true;
    });

    const openDetails = (id: string) => {
        router.push({ pathname: '/task/[id]', params: { id } });
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <FlatList
                data={filteredTasks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TaskCard
                        task={item}
                        onPress={openDetails}
                        onToggle={toggleTask}
                        onDelete={deleteTask}
                    />
                )}
                ListHeaderComponent={
                    <View>
                        <Text style={[styles.title, { color: colors.text }]}>
                            Activity Tracker
                        </Text>
                        <Text style={[styles.subtitle, { color: colors.secondaryText }]}>
                            Планируйте тренировки и следите за активностью
                        </Text>

                        <View style={[styles.statsCard, { backgroundColor: colors.accent }]}>
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

                        <Pressable
                            style={({ pressed }) => [
                                styles.addButton,
                                {
                                    backgroundColor: pressed
                                        ? colors.accentPressed
                                        : colors.accent,
                                },
                            ]}
                            onPress={() => router.push('/task/new')}
                        >
                            <Text style={[styles.addButtonText, { color: colors.accentText }]}>
                                Добавить тренировку
                            </Text>
                        </Pressable>

                        <View style={styles.filterContainer}>
                            <Text style={[styles.sectionTitle, { color: colors.text }]}>
                                Тренировки
                            </Text>

                            <View style={styles.filters}>
                                {FILTER_OPTIONS.map((option) => {
                                    const active = filter === option.value;
                                    return (
                                        <Pressable
                                            key={option.value}
                                            onPress={() => setFilter(option.value)}
                                            style={({ pressed }) => [
                                                styles.filter,
                                                {
                                                    backgroundColor: active
                                                        ? pressed
                                                            ? colors.accentPressed
                                                            : colors.accent
                                                        : pressed
                                                            ? colors.softPressed
                                                            : colors.inputBackground,
                                                },
                                            ]}
                                        >
                                            <Text
                                                style={[
                                                    styles.filterText,
                                                    {
                                                        color: active
                                                            ? colors.accentText
                                                            : colors.secondaryText,
                                                    },
                                                ]}
                                            >
                                                {option.label}
                                            </Text>
                                        </Pressable>
                                    );
                                })}
                            </View>
                        </View>
                    </View>
                }
                ListEmptyComponent={
                    <View style={[styles.emptyContainer, { backgroundColor: colors.card }]}>
                        <Text style={[styles.emptyTitle, { color: colors.text }]}>
                            Список пока пуст
                        </Text>
                        <Text style={[styles.emptyText, { color: colors.secondaryText }]}>
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
    },
    listContent: {
        padding: 20,
        paddingBottom: 32,
    },
    title: {
        fontSize: 30,
        fontWeight: '700',
        marginTop: 8,
    },
    subtitle: {
        fontSize: 14,
        marginTop: 5,
        marginBottom: 18,
    },
    statsCard: {
        borderRadius: 18,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
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
    addButton: {
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
        marginBottom: 8,
    },
    addButtonText: {
        fontSize: 15,
        fontWeight: '700',
    },
    filterContainer: {
        marginTop: 22,
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 21,
        fontWeight: '700',
        marginBottom: 12,
    },
    filters: {
        flexDirection: 'row',
        gap: 8,
    },
    filter: {
        paddingVertical: 9,
        paddingHorizontal: 14,
        borderRadius: 12,
        overflow: 'hidden',
        fontSize: 13,
        fontWeight: '600',
    },
    emptyContainer: {
        alignItems: 'center',
        borderRadius: 16,
        padding: 28,
        marginTop: 8,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: '700',
    },
    emptyText: {
        fontSize: 14,
        textAlign: 'center',
        marginTop: 7,
    },
    filterText: {
        fontSize: 13,
        fontWeight: '600',
    },
    headerButton: {
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
});
