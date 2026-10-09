import { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useTheme } from '../../../src/context/ThemeContext';
import { useTasks } from '../../../src/context/TasksContext';
import TaskForm, { TaskFormValues } from '../../../src/components/TaskForm';

export default function EditTaskScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { colors } = useTheme();
    const { getTaskById, updateTask } = useTasks();

    const task = getTaskById(id);

    useEffect(() => {
        if (!task) {
            router.replace('/');
        }
    }, [task]);

    if (!task) {
        return (
            <View
                style={[
                    styles.screen,
                    styles.centered,
                    { backgroundColor: colors.background },
                ]}
            >
                <Text style={{ color: colors.secondaryText }}>
                    Тренировка не найдена, возвращаемся к списку…
                </Text>
            </View>
        );
    }

    const handleSubmit = (values: TaskFormValues) => {
        updateTask(task.id, values);
        router.back();
    };

    return (
        <ScrollView
            style={{ backgroundColor: colors.background }}
            contentContainerStyle={styles.content}
        >
            <TaskForm
                initialValues={task}
                submitLabel="Сохранить"
                onSubmit={handleSubmit}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    centered: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        padding: 16,
    },
});
