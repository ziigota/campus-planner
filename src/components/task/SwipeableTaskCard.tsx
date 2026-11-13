import { useCallback } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
    Extrapolation,
    interpolate,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';

import { useTheme } from '../../context/ThemeContext';
import { radius } from '../../theme/spacing';
import { Task } from '../../types/task';
import TaskCard from './TaskCard';

export const SWIPE_ACTION_THRESHOLD = 105;
const MAX_SWIPE_DISTANCE = 135;

interface SwipeableTaskCardProps {
    task: Task;
    onPress: (id: string) => void;
    onToggle: (id: string) => void;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

export default function SwipeableTaskCard({
                                              task,
                                              onPress,
                                              onToggle,
                                              onEdit,
                                              onDelete,
                                          }: SwipeableTaskCardProps) {
    const { colors } = useTheme();
    const translateX = useSharedValue(0);

    const showDeleteConfirmation = useCallback(() => {
        Alert.alert(
            'Удалить задачу?',
            `Задача «${task.title}» будет удалена.`,
            [
                { text: 'Отмена', style: 'cancel' },
                {
                    text: 'Удалить',
                    style: 'destructive',
                    onPress: () => onDelete(task.id),
                },
            ],
        );
    }, [onDelete, task.id, task.title]);

    const pan = Gesture.Pan()
        // Жест начинается только при заметном горизонтальном движении.
        // Вертикальное движение остаётся прокруткой FlatList.
        .activeOffsetX([-12, 12])
        .failOffsetY([-12, 12])
        .onUpdate((event) => {
            translateX.value = Math.max(
                -MAX_SWIPE_DISTANCE,
                Math.min(MAX_SWIPE_DISTANCE, event.translationX),
            );
        })
        .onEnd(() => {
            if (translateX.value >= SWIPE_ACTION_THRESHOLD) {
                translateX.value = withSpring(0);
                runOnJS(onToggle)(task.id);
                return;
            }

            if (translateX.value <= -SWIPE_ACTION_THRESHOLD) {
                translateX.value = withSpring(0);
                runOnJS(showDeleteConfirmation)();
                return;
            }

            // Если порог не достигнут, карточка мягко возвращается назад.
            translateX.value = withSpring(0);
        });

    const cardAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    const completeBackgroundStyle = useAnimatedStyle(() => ({
        opacity: interpolate(
            translateX.value,
            [0, SWIPE_ACTION_THRESHOLD],
            [0, 1],
            Extrapolation.CLAMP,
        ),
    }));

    const deleteBackgroundStyle = useAnimatedStyle(() => ({
        opacity: interpolate(
            translateX.value,
            [-SWIPE_ACTION_THRESHOLD, 0],
            [1, 0],
            Extrapolation.CLAMP,
        ),
    }));

    return (
        <View style={styles.container}>
            <Animated.View
                pointerEvents="none"
                style={[
                    styles.action,
                    styles.completeAction,
                    { backgroundColor: colors.accent },
                    completeBackgroundStyle,
                ]}
            >
                <Text style={[styles.actionText, { color: colors.accentText }]}>
                    {task.status === 'completed' ? 'Вернуть' : 'Выполнить'}
                </Text>
            </Animated.View>

            <Animated.View
                pointerEvents="none"
                style={[
                    styles.action,
                    styles.deleteAction,
                    { backgroundColor: colors.danger },
                    deleteBackgroundStyle,
                ]}
            >
                <Text style={[styles.actionText, { color: colors.dangerText }]}>
                    Удалить
                </Text>
            </Animated.View>

            <GestureDetector gesture={pan}>
                <Animated.View style={cardAnimatedStyle}>
                    <TaskCard
                        task={task}
                        onPress={onPress}
                        onToggle={onToggle}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                </Animated.View>
            </GestureDetector>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        borderRadius: radius.lg,
        overflow: 'hidden',
    },
    action: {
        ...StyleSheet.absoluteFill,
        justifyContent: 'center',
        paddingHorizontal: 22,
    },
    completeAction: {
        alignItems: 'flex-start',
    },
    deleteAction: {
        alignItems: 'flex-end',
    },
    actionText: {
        fontSize: 14,
        fontWeight: '700',
    },
});
