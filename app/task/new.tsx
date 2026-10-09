import { ScrollView, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '../../src/context/ThemeContext';
import { useTasks } from '../../src/context/TasksContext';
import TaskForm, { TaskFormValues } from '../../src/components/TaskForm';

export default function NewTaskScreen() {
    const { colors } = useTheme();
    const { addTask } = useTasks();

    const handleSubmit = (values: TaskFormValues) => {
        addTask(values);
        router.back();
    };

    return (
        <ScrollView
            style={{ backgroundColor: colors.background }}
            contentContainerStyle={styles.content}
        >
            <TaskForm
                submitLabel="Добавить"
                enableDraft
                onSubmit={handleSubmit}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    content: {
        padding: 16,
    },
});
