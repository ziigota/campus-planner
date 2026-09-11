import { useState } from 'react';
import {
    Alert,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { Task } from '../types/task';

interface TaskFormProps {
    onAdd: (
        title: string,
        subject: string,
        durationMinutes: number,
        priority: Task['priority'],
    ) => void;
}

export default function TaskForm({ onAdd }: TaskFormProps) {
    const [title, setTitle] = useState('');
    const [subject, setSubject] = useState('');
    const [duration, setDuration] = useState('');
    const [priority, setPriority] = useState<Task['priority']>('medium');

    const handleAdd = () => {
        const trimmedTitle = title.trim();
        const trimmedSubject = subject.trim();
        const parsedDuration = Number(duration.trim());

        if (!trimmedTitle || !trimmedSubject) {
            Alert.alert(
                'Заполните поля',
                'Введите название тренировки и её тип.',
            );
            return;
        }

        if (
            !duration.trim() ||
            !Number.isFinite(parsedDuration) ||
            parsedDuration <= 0
        ) {
            Alert.alert(
                'Некорректная длительность',
                'Введите длительность тренировки в минутах.',
            );
            return;
        }

        onAdd(
            trimmedTitle,
            trimmedSubject,
            parsedDuration,
            priority,
        );

        setTitle('');
        setSubject('');
        setDuration('');
        setPriority('medium');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Добавить тренировку</Text>

            <TextInput
                style={styles.input}
                placeholder="Название тренировки"
                placeholderTextColor="#998BA1"
                value={title}
                onChangeText={setTitle}
            />

            <TextInput
                style={styles.input}
                placeholder="Тип тренировки"
                placeholderTextColor="#998BA1"
                value={subject}
                onChangeText={setSubject}
            />

            <TextInput
                style={styles.input}
                placeholder="Длительность, минут"
                placeholderTextColor="#998BA1"
                value={duration}
                onChangeText={setDuration}
                keyboardType="numeric"
            />

            <Text style={styles.label}>Приоритет</Text>

            <View style={styles.priorityRow}>
                {(['low', 'medium', 'high'] as Task['priority'][]).map(
                    (item) => (
                        <Pressable
                            key={item}
                            style={[
                                styles.priorityButton,
                                priority === item && styles.selectedPriority,
                            ]}
                            onPress={() => setPriority(item)}
                        >
                            <Text
                                style={[
                                    styles.priorityText,
                                    priority === item && styles.selectedPriorityText,
                                ]}
                            >
                                {item === 'low'
                                    ? 'Низкая'
                                    : item === 'medium'
                                        ? 'Средняя'
                                        : 'Высокая'}
                            </Text>
                        </Pressable>
                    ),
                )}
            </View>

            <Pressable style={styles.addButton} onPress={handleAdd}>
                <Text style={styles.addButtonText}>Добавить</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        padding: 16,
        borderWidth: 1,
        borderColor: '#E4D9ED',
    },
    heading: {
        color: '#2D174A',
        fontSize: 19,
        fontWeight: '700',
        marginBottom: 14,
    },
    input: {
        height: 46,
        borderWidth: 1,
        borderColor: '#D8C9E2',
        borderRadius: 10,
        paddingHorizontal: 12,
        color: '#2D174A',
        marginBottom: 10,
        backgroundColor: '#FCFAFE',
    },
    label: {
        color: '#5C4968',
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
        backgroundColor: '#EEE7F4',
    },
    selectedPriority: {
        backgroundColor: '#6F3FA3',
    },
    priorityText: {
        color: '#654D72',
        fontSize: 11,
        fontWeight: '600',
    },
    selectedPriorityText: {
        color: '#FFFFFF',
    },
    addButton: {
        backgroundColor: '#6F3FA3',
        borderRadius: 11,
        paddingVertical: 12,
        alignItems: 'center',
        marginTop: 14,
    },
    addButtonText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '700',
    },
});
