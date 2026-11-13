import { StyleSheet, Text, View } from 'react-native';

import { PRIORITY_OPTIONS } from '../../constants/task';
import { useTheme } from '../../context/ThemeContext';
import { useTaskForm } from '../../hooks/useTaskForm';
import { radius, spacing } from '../../theme/spacing';
import { CreateTaskInput, Task } from '../../types/task';
import AppButton from '../ui/AppButton';
import AppInput from '../ui/AppInput';
import DateField from '../ui/DateField';
import SegmentedControl from '../ui/SegmentedControl';

interface TaskFormProps {
    initialValues?: Task;
    submitLabel: string;
    enableDraft?: boolean;
    onSubmit: (input: CreateTaskInput) => void;
}
export default function TaskForm({
                                     initialValues,
                                     submitLabel,
                                     enableDraft = false,
                                     onSubmit,
                                 }: TaskFormProps) {
    const { colors } = useTheme();
    const { values, errors, setField, submit } = useTaskForm({
        initialValues,
        enableDraft,
        onSubmit,
    });

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: colors.card, borderColor: colors.cardBorder },
            ]}
        >
            <AppInput
                label="Название задачи"
                placeholder="Например, Утренняя пробежка"
                value={values.title}
                onChangeText={(text) => setField('title', text)}
                error={errors.title}
            />

            <AppInput
                label="Упражнение"
                placeholder="Например, Бег"
                value={values.subject}
                onChangeText={(text) => setField('subject', text)}
                error={errors.subject}
            />

            <AppInput
                label="Длительность, минут"
                placeholder="30"
                value={values.duration}
                onChangeText={(text) => setField('duration', text)}
                keyboardType="numeric"
                error={errors.duration}
            />

            <DateField
                label="Срок выполнения (необязательно)"
                value={values.dueDate}
                onChange={(date) => setField('dueDate', date)}
                error={errors.dueDate}
            />

            <AppInput
                label="Заметка (необязательно)"
                placeholder="Например, лёгкий темп, 5 км"
                value={values.note}
                onChangeText={(text) => setField('note', text)}
                multiline
                numberOfLines={3}
                style={styles.noteInput}
            />

            <Text style={[styles.label, { color: colors.secondaryText }]}>
                Приоритет
            </Text>
            <SegmentedControl
                options={PRIORITY_OPTIONS}
                value={values.priority}
                onChange={(priority) => setField('priority', priority)}
                stretch
            />

            <AppButton
                title={submitLabel}
                onPress={submit}
                style={styles.submit}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: radius.xl,
        padding: spacing.md,
        borderWidth: 1,
    },
    label: {
        fontSize: 13,
        fontWeight: '600',
        marginTop: 2,
        marginBottom: spacing.sm,
    },
    noteInput: {
        height: 90,
        paddingTop: spacing.sm + spacing.xs,
        textAlignVertical: 'top',
    },
    submit: {
        marginTop: spacing.md,
    },
});
