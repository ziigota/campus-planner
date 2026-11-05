import { StyleSheet, Text, View } from 'react-native';

import { PRIORITY_OPTIONS } from '../../constants/task';
import { useTheme } from '../../context/ThemeContext';
import { useTaskForm } from '../../hooks/useTaskForm';
import { radius, spacing } from '../../theme/spacing';
import { CreateTaskInput, Task } from '../../types/task';
import AppButton from '../ui/AppButton';
import AppInput from '../ui/AppInput';
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
                label="Предмет"
                placeholder="Например, Кардио"
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

            <AppInput
                label="Срок выполнения (необязательно)"
                placeholder="ГГГГ-ММ-ДД"
                value={values.dueDate}
                onChangeText={(text) => setField('dueDate', text)}
                keyboardType="numbers-and-punctuation"
                maxLength={10}
                error={errors.dueDate}
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
    submit: {
        marginTop: spacing.md,
    },
});
