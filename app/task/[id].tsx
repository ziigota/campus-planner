import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useTheme } from '../../src/context/ThemeContext';
import { useTasks } from '../../src/context/TasksContext';

const priorityLabels: Record<string, string> = {
    low: 'Низкая',
    medium: 'Средняя',
    high: 'Высокая',
};

export default function TaskDetailsScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { colors } = useTheme();
    const { getTaskById, toggleTask } = useTasks();

    const task = getTaskById(id);

    if (!task) {
        return (
            <View
                style={[
                    styles.screen,
                    styles.centered,
                    { backgroundColor: colors.background },
                ]}
            >
                <Text style={[styles.notFoundText, { color: colors.text }]}>
                    Задача не найдена.
                </Text>
                <Text style={{ color: colors.secondaryText, marginTop: 6 }}>
                    Возможно, она была удалена.
                </Text>
                <Pressable
                    style={({ pressed }) => [
                        styles.primaryButton,
                        {
                            backgroundColor: pressed
                                ? colors.accentPressed
                                : colors.accent,
                        },
                    ]}
                    onPress={() => router.replace('/')}
                >
                    <Text style={{ color: colors.accentText, fontWeight: '700' }}>
                        К списку задач
                    </Text>
                </Pressable>
            </View>
        );
    }

    return (
        <View style={[styles.screen, { backgroundColor: colors.background }]}>
            <View
                style={[
                    styles.card,
                    { backgroundColor: colors.card, borderColor: colors.cardBorder },
                ]}
            >
                <Text style={[styles.title, { color: colors.text }]}>
                    {task.title}
                </Text>
                <Text style={[styles.subject, { color: colors.accent }]}>
                    {task.subject}
                </Text>

                <View style={styles.row}>
                    <Text style={{ color: colors.secondaryText }}>Длительность:</Text>
                    <Text style={{ color: colors.text, fontWeight: '600' }}>
                        {task.durationMinutes} мин.
                    </Text>
                </View>

                <View style={styles.row}>
                    <Text style={{ color: colors.secondaryText }}>Приоритет:</Text>
                    <Text style={{ color: colors.text, fontWeight: '600' }}>
                        {priorityLabels[task.priority]}
                    </Text>
                </View>

                <View style={styles.row}>
                    <Text style={{ color: colors.secondaryText }}>Статус:</Text>
                    <Text style={{ color: colors.text, fontWeight: '600' }}>
                        {task.isCompleted ? 'Выполнено' : 'Активна'}
                    </Text>
                </View>
            </View>

            <Pressable
                style={({ pressed }) => [
                    styles.primaryButton,
                    {
                        backgroundColor: pressed
                            ? colors.accentPressed
                            : colors.accent,
                    },
                ]}
                onPress={() => toggleTask(task.id)}
            >
                <Text style={{ color: colors.accentText, fontWeight: '700' }}>
                    {task.isCompleted ? 'Вернуть в активные' : 'Отметить выполненной'}
                </Text>
            </Pressable>

            <Pressable
                style={({ pressed }) => [
                    styles.secondaryButton,
                    {
                        backgroundColor: pressed
                            ? colors.softPressed
                            : colors.inputBackground,
                    },
                ]}
                onPress={() =>
                    router.push({
                        pathname: '/task/edit/[id]',
                        params: { id: task.id },
                    })
                }
            >
                <Text style={{ color: colors.accent, fontWeight: '700' }}>
                    Редактировать
                </Text>
            </Pressable>

            <Pressable
                style={({ pressed }) => [
                    styles.backLink,
                    pressed && { backgroundColor: colors.softPressed },
                ]}
                onPress={() => router.back()}
            >
                <Text style={{ color: colors.secondaryText }}>Назад</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 16,
    },
    centered: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    notFoundText: {
        fontSize: 18,
        fontWeight: '700',
    },
    card: {
        borderRadius: 18,
        borderWidth: 1,
        padding: 18,
        marginBottom: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
    },
    subject: {
        fontSize: 15,
        fontWeight: '600',
        marginTop: 6,
        marginBottom: 14,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 6,
    },
    primaryButton: {
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
        marginBottom: 10,
    },
    secondaryButton: {
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
        marginBottom: 10,
    },
    backLink: {
        alignItems: 'center',
        paddingVertical: 8,
        borderRadius: 12,
    },
});
