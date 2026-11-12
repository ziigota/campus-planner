import { StyleSheet, Text, View } from 'react-native';

import { useTheme } from '../../context/ThemeContext';
import { useWeeklyProgress } from '../../hooks/useWeeklyProgress';
import { radius, spacing } from '../../theme/spacing';
import ProgressBar from '../ui/ProgressBar';

export default function TaskProgress() {
    const { colors } = useTheme();
    const { completed, goal, ratio } = useWeeklyProgress();

    const percent = Math.round(ratio * 100);
    const isGoalReached = completed >= goal;

    return (
        <View
            style={[
                styles.card,
                { backgroundColor: colors.card, borderColor: colors.cardBorder },
            ]}
        >
            <View style={styles.header}>
                <Text style={[styles.title, { color: colors.text }]}>Прогресс</Text>
                <Text style={[styles.percent, { color: colors.accent }]}>{percent}%</Text>
            </View>

            <ProgressBar value={ratio} />

            <Text style={[styles.caption, { color: colors.secondaryText }]}>
                {`Недельная цель: ${completed} из ${goal}`}
                {isGoalReached ? ' — цель достигнута' : ''}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: radius.lg,
        borderWidth: 1,
        padding: spacing.md,
        marginBottom: spacing.md,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: spacing.sm + 2,
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
    },
    percent: {
        fontSize: 16,
        fontWeight: '700',
    },
    caption: {
        fontSize: 12,
        marginTop: spacing.sm,
    },
});
