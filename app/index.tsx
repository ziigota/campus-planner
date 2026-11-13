import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from 'expo-router';
import { ClipboardList, SearchX } from 'lucide-react-native';
import Animated, {
    FadeInDown,
    FadeOutUp,
    LinearTransition,
} from 'react-native-reanimated';

import SwipeableTaskCard from '../src/components/task/SwipeableTaskCard';
import TaskListHeader from '../src/components/task/TaskListHeader';
import AppButton from '../src/components/ui/AppButton';
import EmptyState from '../src/components/ui/EmptyState';
import Screen from '../src/components/ui/Screen';
import { useTaskList } from '../src/hooks/useTaskList';
import { useTheme } from '../src/context/ThemeContext';
import { useTaskNavigation } from '../src/hooks/useTaskNavigation';
import { useTasks } from '../src/hooks/useTasks';
import { duration } from '../src/theme/animation';
import { spacing } from '../src/theme/spacing';
import { Task } from '../src/types/task';

const UNDO_TIMEOUT_MS = 5000;

export default function TaskListScreen() {
    const {
        tasks,
        toggleTaskStatus,
        removeTask,
        restoreTask,
    } = useTasks();
    const list = useTaskList();
    const { colors } = useTheme();
    const navigate = useTaskNavigation();
    const navigation = useNavigation();
    const [recentlyRemovedTask, setRecentlyRemovedTask] = useState<Task | null>(null);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <AppButton
                    title="Настройки"
                    variant="link"
                    size="sm"
                    onPress={navigate.openSettings}
                />
            ),
        });
    }, [navigation, navigate]);


    useEffect(() => {
        if (!recentlyRemovedTask) {
            return;
        }

        const timeoutId = setTimeout(() => {
            setRecentlyRemovedTask(null);
        }, UNDO_TIMEOUT_MS);

        return () => clearTimeout(timeoutId);
    }, [recentlyRemovedTask]);

    const handleDelete = useCallback((id: string) => {
        const task = tasks.find((item) => item.id === id);
        if (!task) {
            return;
        }

        setRecentlyRemovedTask(task);
        removeTask(id);
    }, [tasks, removeTask]);

    const handleUndoDelete = useCallback(() => {
        if (!recentlyRemovedTask) {
            return;
        }

        restoreTask(recentlyRemovedTask);
        setRecentlyRemovedTask(null);
    }, [recentlyRemovedTask, restoreTask]);

    const emptyState =
        tasks.length === 0 ? (
            <EmptyState
                icon={ClipboardList}
                title="Список пока пуст"
                description="Добавьте первую тренировку."
                actionLabel="Добавить тренировку"
                onAction={navigate.openNewTask}
            />
        ) : (
            <EmptyState
                icon={SearchX}
                title="Ничего не найдено"
                description="Измените запрос или выберите другой фильтр."
                actionLabel="Сбросить поиск и фильтр"
                onAction={list.resetFilters}
            />
        );

    return (
        <Screen padded={false}>
            <View style={styles.screenContainer}>
                <Animated.FlatList
                    data={list.visibleTasks}
                    keyExtractor={(item) => item.id}
                    itemLayoutAnimation={LinearTransition.duration(duration.normal)}
                    renderItem={({ item }) => (
                        <SwipeableTaskCard
                            task={item}
                            onPress={navigate.openTask}
                            onToggle={toggleTaskStatus}
                            onEdit={navigate.openEditTask}
                            onDelete={handleDelete}
                        />
                    )}
                    ListHeaderComponent={
                        <View>
                            <TaskListHeader
                                counts={list.counts}
                                filter={list.filter}
                                onFilterChange={list.setFilter}
                                query={list.query}
                                onQueryChange={list.setQuery}
                                sortMode={list.sortMode}
                                onSortChange={list.setSortMode}
                                onAdd={navigate.openNewTask}
                            />
                        </View>
                    }
                    ListEmptyComponent={emptyState}
                    contentContainerStyle={styles.listContent}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                    style={styles.list}
                />
                {recentlyRemovedTask ? (
                    <Animated.View
                        entering={FadeInDown.duration(duration.normal)}
                        exiting={FadeOutUp.duration(duration.normal)}
                        style={[styles.undoContainer, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}
                    >
                        <Text style={[styles.undoText, { color: colors.text }]}>
                            Задача удалена
                        </Text>
                        <AppButton
                            title="Отменить"
                            size="sm"
                            variant="secondary"
                            onPress={handleUndoDelete}
                        />
                    </Animated.View>
                ) : null}
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
    },
    list: {
        flex: 1,
    },
    listContent: {
        padding: spacing.lg,
        paddingBottom: spacing.xl,
    },
    undoContainer: {
        minHeight: 54,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        marginBottom: spacing.md,
        borderRadius: 12,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: spacing.md,
    },
    undoText: {
        fontSize: 14,
        fontWeight: '600',
    },
});
