import TaskForm from '../../../src/components/task/TaskForm';
import EmptyState from '../../../src/components/ui/EmptyState';
import Screen from '../../../src/components/ui/Screen';
import { useRouteTask } from '../../../src/hooks/useRouteTask';
import { useTaskNavigation } from '../../../src/hooks/useTaskNavigation';
import { useTasks } from '../../../src/hooks/useTasks';
import { CreateTaskInput } from '../../../src/types/task';

export default function EditTaskScreen() {
    const task = useRouteTask();
    const { updateTask } = useTasks();
    const navigate = useTaskNavigation();

    if (!task) {
        return (
            <Screen centered>
                <EmptyState
                    icon="🔎"
                    title="Задача не найдена"
                    description="Возможно, она была удалена."
                    actionLabel="К списку задач"
                    onAction={navigate.goHome}
                />
            </Screen>
        );
    }

    const handleSubmit = (input: CreateTaskInput) => {
        updateTask(task.id, input);
        navigate.goBack();
    };

    return (
        <Screen scroll>
            <TaskForm
                initialValues={task}
                submitLabel="Сохранить"
                onSubmit={handleSubmit}
            />
        </Screen>
    );
}
