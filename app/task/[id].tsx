import { StyleSheet, View } from 'react-native';
import { SearchX } from 'lucide-react-native';

import TaskDetails from '../../src/components/task/TaskDetails';
import AppButton from '../../src/components/ui/AppButton';
import EmptyState from '../../src/components/ui/EmptyState';
import Screen from '../../src/components/ui/Screen';
import { useRouteTask } from '../../src/hooks/useRouteTask';
import { useTaskNavigation } from '../../src/hooks/useTaskNavigation';
import { useTasks } from '../../src/hooks/useTasks';
import { spacing } from '../../src/theme/spacing';

export default function TaskDetailsScreen() {
    const task = useRouteTask();
    const { toggleTaskStatus } = useTasks();
    const navigate = useTaskNavigation();

    if (!task) {
        return (
            <Screen centered>
                <EmptyState
                    icon={SearchX}
                    title="Задача не найдена"
                    description="Возможно, она была удалена."
                    actionLabel="К списку задач"
                    onAction={navigate.goHome}
                />
            </Screen>
        );
    }

    return (
        <Screen scroll>
            <TaskDetails task={task} />

            <View style={styles.actions}>
                <AppButton
                    title={
                        task.status === 'completed'
                            ? 'Вернуть в активные'
                            : 'Отметить выполненной'
                    }
                    onPress={() => toggleTaskStatus(task.id)}
                />
                <AppButton
                    title="Редактировать"
                    variant="secondary"
                    onPress={() => navigate.openEditTask(task.id)}
                />
                <AppButton title="Назад" variant="ghost" onPress={navigate.goBack} />
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    actions: {
        gap: spacing.sm + 2,
    },
});
