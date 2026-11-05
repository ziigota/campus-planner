import TaskForm from '../../src/components/task/TaskForm';
import Screen from '../../src/components/ui/Screen';
import { useTaskNavigation } from '../../src/hooks/useTaskNavigation';
import { useTasks } from '../../src/hooks/useTasks';
import { CreateTaskInput } from '../../src/types/task';

export default function NewTaskScreen() {
    const { createTask } = useTasks();
    const navigate = useTaskNavigation();

    const handleSubmit = (input: CreateTaskInput) => {
        createTask(input);
        navigate.goBack();
    };

    return (
        <Screen scroll>
            <TaskForm submitLabel="Добавить" enableDraft onSubmit={handleSubmit} />
        </Screen>
    );
}
