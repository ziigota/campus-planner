import { useEffect, useRef, useState } from 'react';
import {
    Alert,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { Task, TaskDraft } from '../types/task';
import { useTheme } from '../context/ThemeContext';
import { clearDraft, getDraft, saveDraft } from '../storage/draft';

export interface TaskFormValues {
    title: string;
    subject: string;
    durationMinutes: number;
    priority: Task['priority'];
}

interface TaskFormProps {
    initialValues?: Task;
    submitLabel: string;
    enableDraft?: boolean;
    onSubmit: (values: TaskFormValues) => void;
}

const priorityOptions: Task['priority'][] = ['low', 'medium', 'high'];
const priorityLabels: Record<Task['priority'], string> = {
    low: 'Низкая',
    medium: 'Средняя',
    high: 'Высокая',
};

export default function TaskForm({
                                     initialValues,
                                     submitLabel,
                                     enableDraft = false,
                                     onSubmit,
                                 }: TaskFormProps) {
    const { colors } = useTheme();

    const [title, setTitle] = useState(initialValues?.title ?? '');
    const [subject, setSubject] = useState(initialValues?.subject ?? '');
    const [duration, setDuration] = useState(
        initialValues ? String(initialValues.durationMinutes) : '',
    );
    const [priority, setPriority] = useState<Task['priority']>(
        initialValues?.priority ?? 'medium',
    );
    
    const hydrated = useRef(!enableDraft);

    useEffect(() => {
        if (!enableDraft || initialValues) {
            return;
        }

        let isMounted = true;

        (async () => {
            const draft = await getDraft();
            if (!isMounted || !draft) {
                hydrated.current = true;
                return;
            }

            Alert.alert(
                'Восстановить черновик?',
                'У вас есть незавершённая задача. Восстановить введённые данные?',
                [
                    {
                        text: 'Нет, начать заново',
                        style: 'cancel',
                        onPress: () => {
                            clearDraft();
                            hydrated.current = true;
                        },
                    },
                    {
                        text: 'Восстановить',
                        onPress: () => {
                            setTitle(draft.title);
                            setSubject(draft.subject);
                            setDuration(draft.duration);
                            setPriority(draft.priority);
                            hydrated.current = true;
                        },
                    },
                ],
            );
        })();

        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        if (!enableDraft || !hydrated.current) {
            return;
        }

        const draft: TaskDraft = { title, subject, duration, priority };
        saveDraft(draft);
    }, [enableDraft, title, subject, duration, priority]);

    const handleSubmit = () => {
        const trimmedTitle = title.trim();
        const trimmedSubject = subject.trim();
        const parsedDuration = Number(duration.trim());

        if (!trimmedTitle || !trimmedSubject) {
            Alert.alert('Заполните поля', 'Введите название задачи и предмет.');
            return;
        }

        if (
            !duration.trim() ||
            !Number.isFinite(parsedDuration) ||
            parsedDuration <= 0
        ) {
            Alert.alert(
                'Некорректная длительность',
                'Введите длительность задачи в минутах.',
            );
            return;
        }

        onSubmit({
            title: trimmedTitle,
            subject: trimmedSubject,
            durationMinutes: parsedDuration,
            priority,
        });

        if (enableDraft) {
            clearDraft();
        }
    };

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: colors.card, borderColor: colors.cardBorder },
            ]}
        >
            <TextInput
                style={[
                    styles.input,
                    {
                        borderColor: colors.inputBorder,
                        backgroundColor: colors.inputBackground,
                        color: colors.text,
                    },
                ]}
                placeholder="Название задачи"
                placeholderTextColor={colors.secondaryText}
                value={title}
                onChangeText={setTitle}
            />

            <TextInput
                style={[
                    styles.input,
                    {
                        borderColor: colors.inputBorder,
                        backgroundColor: colors.inputBackground,
                        color: colors.text,
                    },
                ]}
                placeholder="Предмет"
                placeholderTextColor={colors.secondaryText}
                value={subject}
                onChangeText={setSubject}
            />

            <TextInput
                style={[
                    styles.input,
                    {
                        borderColor: colors.inputBorder,
                        backgroundColor: colors.inputBackground,
                        color: colors.text,
                    },
                ]}
                placeholder="Длительность, минут"
                placeholderTextColor={colors.secondaryText}
                value={duration}
                onChangeText={setDuration}
                keyboardType="numeric"
            />

            <Text style={[styles.label, { color: colors.secondaryText }]}>
                Приоритет
            </Text>

            <View style={styles.priorityRow}>
                {priorityOptions.map((item) => {
                    const selected = priority === item;
                    return (
                        <Pressable
                            key={item}
                            style={({ pressed }) => [
                                styles.priorityButton,
                                {
                                    backgroundColor: selected
                                        ? pressed
                                            ? colors.accentPressed
                                            : colors.accent
                                        : pressed
                                            ? colors.softPressed
                                            : colors.inputBackground,
                                },
                            ]}
                            onPress={() => setPriority(item)}
                        >
                            <Text
                                style={[
                                    styles.priorityText,
                                    {
                                        color: selected
                                            ? colors.accentText
                                            : colors.secondaryText,
                                    },
                                ]}
                            >
                                {priorityLabels[item]}
                            </Text>
                        </Pressable>
                    );
                })}
            </View>

            <Pressable
                onPress={handleSubmit}
                style={({ pressed }) => [
                    styles.submitButton,
                    {
                        backgroundColor: pressed
                            ? colors.accentPressed
                            : colors.accent,
                    },
                ]}
            >
                <Text style={[styles.submitButtonText, { color: colors.accentText }]}>
                    {submitLabel}
                </Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 18,
        padding: 16,
        borderWidth: 1,
    },
    input: {
        height: 46,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 12,
        marginBottom: 10,
    },
    label: {
        fontSize: 13,
        fontWeight: '600',
        marginTop: 2,
        marginBottom: 8,
    },
    priorityRow: {
        flexDirection: 'row',
        gap: 7,
    },
    priorityButton: {
        flex: 1,
        borderRadius: 9,
        paddingVertical: 9,
        alignItems: 'center',
    },
    priorityText: {
        fontSize: 11,
        fontWeight: '600',
    },
    submitButton: {
        borderRadius: 11,
        paddingVertical: 12,
        alignItems: 'center',
        marginTop: 14,
    },
    submitButtonPressed: {
        opacity: 0.85,
    },
    submitButtonText: {
        fontSize: 15,
        fontWeight: '700',
    },
});
