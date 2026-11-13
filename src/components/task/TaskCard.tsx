import { useEffect, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
    Extrapolation,
    interpolate,
    interpolateColor,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSequence,
    withSpring,
    withTiming,
} from 'react-native-reanimated';

import { PRIORITY_LABELS, STATUS_LABELS } from '../../constants/task';
import { useTheme } from '../../context/ThemeContext';
import { useCollapsible } from '../../hooks/useCollapsible';
import {
    COMPLETED_OPACITY,
    createAnimation,
    springConfig,
    timingConfig,
} from '../../theme/animation';
import { radius, spacing } from '../../theme/spacing';
import { Task } from '../../types/task';
import { formatDate } from '../../utils/date';
import { isRecentlyCreated, isTaskOverdue } from '../../utils/task';
import AnimatedListItem from '../ui/AnimatedListItem';
import AppButton from '../ui/AppButton';
import Badge from '../ui/Badge';
import Collapsible from '../ui/Collapsible';
import ExpandToggle from '../ui/ExpandToggle';
import TaskCardDetails from './TaskCardDetails';
import TaskStatusIcon from './TaskStatusIcon';

interface TaskCardProps {
    task: Task;
    onPress: (id: string) => void;
    onToggle: (id: string) => void;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    isRemoving?: boolean;
}

export default function TaskCard({
                                     task,
                                     onPress,
                                     onToggle,
                                     onEdit,
                                     onDelete,
                                 }: TaskCardProps) {
    const { colors } = useTheme();

    const isCompleted = task.status === 'completed';
    const isOverdue = isTaskOverdue(task);
    const completion = useSharedValue(isCompleted ? 1 : 0);

    useEffect(() => {
        completion.value = withSpring(isCompleted ? 1 : 0, springConfig);
    }, [isCompleted, completion]);

    const { expanded, progress: expandProgress, toggle } = useCollapsible();
    const [isNew] = useState(() => isRecentlyCreated(task, createAnimation.windowMs));
    const appear = useSharedValue(isNew ? 0 : 1);
    const highlight = useSharedValue(0);

    useEffect(() => {
        if (!isNew) {
            return;
        }

        appear.value = withDelay(
            createAnimation.delay,
            withTiming(1, timingConfig)
        );

        highlight.value = withDelay(
            createAnimation.delay,
            withSequence(
                withTiming(1, { duration: createAnimation.highlightIn }),
                withTiming(0, { duration: createAnimation.highlightOut }),
            ),
        );
    }, [isNew, appear, highlight]);

    const { card: cardColor, cardPressed: completedColor } = colors;

    const cardStyle = useAnimatedStyle(() => ({
        opacity: interpolate(
            completion.value,
            [0, 1],
            [1, COMPLETED_OPACITY],
            Extrapolation.CLAMP,
        ),
        backgroundColor: interpolateColor(
            completion.value,
            [0, 1],
            [cardColor, completedColor],
        ),
    }));

    const appearStyle = useAnimatedStyle(() => ({
        opacity: appear.value,
        transform: [
            {
                translateY: interpolate(
                    appear.value,
                    [0, 1],
                    [createAnimation.offset, 0],
                    Extrapolation.CLAMP,
                ),
            },
        ],
    }));

    const highlightStyle = useAnimatedStyle(() => ({
        opacity: highlight.value * createAnimation.highlightOpacity,
    }));

    const handleDelete = () => {
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
    };

    return (
        <AnimatedListItem style={styles.item}>
            <Animated.View style={appearStyle}>
                <Animated.View
                    style={[styles.card, { borderColor: colors.cardBorder }, cardStyle]}
                >
                    <Animated.View
                        style={[
                            styles.highlight,
                            { backgroundColor: colors.accent },
                            highlightStyle,
                        ]}
                    />

                    <Pressable
                        onPress={() => onPress(task.id)}
                        style={({ pressed }) => [
                            styles.content,
                            pressed && { backgroundColor: colors.softPressed },
                        ]}
                    >
                        <View style={styles.header}>
                            <TaskStatusIcon progress={completion} />

                            <View style={styles.headerText}>
                                <Text
                                    style={[
                                        styles.title,
                                        { color: colors.text },
                                        isCompleted && styles.completedTitle,
                                    ]}
                                >
                                    {task.title}
                                </Text>
                                <Text style={[styles.status, { color: colors.secondaryText }]}>
                                    {STATUS_LABELS[task.status]}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.badges}>
                            <Badge label={PRIORITY_LABELS[task.priority]} />
                            {task.dueDate ? (
                                <Badge label={`до ${formatDate(task.dueDate)}`} />
                            ) : null}
                            {isOverdue ? <Badge label="Просрочено" tone="danger" /> : null}
                        </View>

                        <View style={styles.actions}>
                            <AppButton
                                title={isCompleted ? 'Вернуть' : 'Выполнить'}
                                variant="secondary"
                                size="sm"
                                onPress={() => onToggle(task.id)}
                                style={styles.action}
                            />
                            <ExpandToggle
                                expanded={expanded}
                                progress={expandProgress}
                                onPress={toggle}
                                style={styles.action}
                            />
                        </View>
                    </Pressable>

                    <Collapsible progress={expandProgress}>
                        <TaskCardDetails
                            task={task}
                            onEdit={() => onEdit(task.id)}
                            onDelete={handleDelete}
                        />
                    </Collapsible>
                </Animated.View>
            </Animated.View>
        </AnimatedListItem>
    );
}

const styles = StyleSheet.create({
    item: {
        marginBottom: spacing.md - 4,
    },
    card: {
        borderRadius: radius.lg,
        borderWidth: 1,
        overflow: 'hidden',
    },
    highlight: {
        ...StyleSheet.absoluteFill,
    },
    content: {
        padding: spacing.md,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm + spacing.xs,
    },
    headerText: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
    },
    completedTitle: {
        textDecorationLine: 'line-through',
    },
    status: {
        fontSize: 12,
        marginTop: 2,
    },
    badges: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.sm,
        marginTop: spacing.sm + 2,
    },
    actions: {
        flexDirection: 'row',
        gap: spacing.sm,
        marginTop: spacing.md - 2,
    },
    action: {
        flex: 1,
    },
});
