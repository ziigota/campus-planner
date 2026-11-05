import { useLayoutEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useNavigation } from 'expo-router';

import TaskCard from '../src/components/task/TaskCard';
import TaskListHeader from '../src/components/task/TaskListHeader';
import AppButton from '../src/components/ui/AppButton';
import EmptyState from '../src/components/ui/EmptyState';
import Screen from '../src/components/ui/Screen';
import { useTaskList } from '../src/hooks/useTaskList';
import { useTaskNavigation } from '../src/hooks/useTaskNavigation';
import { useTasks } from '../src/hooks/useTasks';
import { spacing } from '../src/theme/spacing';

export default function TaskListScreen() {
    const { tasks, toggleTaskStatus, removeTask } = useTasks();
    const list = useTaskList();
    const navigate = useTaskNavigation();
    const navigation = useNavigation();

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

    const emptyState =
        tasks.length === 0 ? (
            <EmptyState
                icon="📋"
                title="Список пока пуст"
                description="Добавьте первую тренировку."
                actionLabel="Добавить тренировку"
                onAction={navigate.openNewTask}
            />
        ) : (
            <EmptyState
                icon="🔍"
                title="Ничего не найдено"
                description="Измените запрос или выберите другой фильтр."
                actionLabel="Сбросить поиск и фильтр"
                onAction={list.resetFilters}
            />
        );

    return (
        <Screen padded={false}>
            <FlatList
                data={list.visibleTasks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TaskCard
                        task={item}
                        onPress={navigate.openTask}
                        onToggle={toggleTaskStatus}
                        onDelete={removeTask}
                    />
                )}
                ListHeaderComponent={
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
                }
                ListEmptyComponent={emptyState}
                contentContainerStyle={styles.listContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            />
        </Screen>
    );
}

const styles = StyleSheet.create({
    listContent: {
        padding: spacing.lg,
        paddingBottom: spacing.xl,
    },
});
