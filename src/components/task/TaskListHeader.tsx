import { StyleSheet, Text, View } from 'react-native';

import { FILTER_OPTIONS, SORT_OPTIONS } from '../../constants/task';
import { useTheme } from '../../context/ThemeContext';
import { radius, spacing } from '../../theme/spacing';
import { TaskCounts, TaskFilter, TaskSortMode } from '../../types/task';
import AppButton from '../ui/AppButton';
import AppInput from '../ui/AppInput';
import SegmentedControl from '../ui/SegmentedControl';

interface TaskListHeaderProps {
    counts: TaskCounts;
    filter: TaskFilter;
    onFilterChange: (filter: TaskFilter) => void;
    query: string;
    onQueryChange: (query: string) => void;
    sortMode: TaskSortMode;
    onSortChange: (mode: TaskSortMode) => void;
    onAdd: () => void;
}

export default function TaskListHeader({
                                           counts,
                                           filter,
                                           onFilterChange,
                                           query,
                                           onQueryChange,
                                           sortMode,
                                           onSortChange,
                                           onAdd,
                                       }: TaskListHeaderProps) {
    const { colors } = useTheme();

    return (
        <View>
            <Text style={[styles.title, { color: colors.text }]}>
                Activity Tracker
            </Text>
            <Text style={[styles.subtitle, { color: colors.secondaryText }]}>
                Планируйте тренировки и следите за активностью
            </Text>

            <View style={[styles.statsCard, { backgroundColor: colors.accent }]}>
                <View>
                    <Text style={[styles.statsLabel, { color: colors.onAccentMuted }]}>
                        Всего тренировок
                    </Text>
                    <Text style={[styles.statsValue, { color: colors.onAccent }]}>
                        {counts.total}
                    </Text>
                </View>

                <View
                    style={[styles.statsDivider, { backgroundColor: colors.accentDivider }]}
                />

                <View>
                    <Text style={[styles.statsLabel, { color: colors.onAccentMuted }]}>
                        Выполнено
                    </Text>
                    <Text style={[styles.statsValue, { color: colors.onAccent }]}>
                        {counts.completed}
                    </Text>
                </View>
            </View>

            <AppButton title="Добавить тренировку" onPress={onAdd} />

            <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Тренировки
            </Text>

            <AppInput
                placeholder="Поиск по названию или предмету"
                value={query}
                onChangeText={onQueryChange}
                returnKeyType="search"
                clearButtonMode="while-editing"
                autoCorrect={false}
            />

            <View style={styles.controls}>
                <SegmentedControl
                    options={FILTER_OPTIONS}
                    value={filter}
                    onChange={onFilterChange}
                />
                <SegmentedControl
                    options={SORT_OPTIONS}
                    value={sortMode}
                    onChange={onSortChange}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        fontWeight: '700',
        marginTop: spacing.sm,
    },
    subtitle: {
        fontSize: 14,
        marginTop: spacing.xs + 1,
        marginBottom: spacing.md + 2,
    },
    statsCard: {
        borderRadius: radius.xl,
        padding: spacing.lg - 4,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    statsLabel: {
        fontSize: 13,
    },
    statsValue: {
        fontSize: 26,
        fontWeight: '700',
        marginTop: 3,
    },
    statsDivider: {
        width: 1,
        height: 42,
        marginHorizontal: spacing.xl,
    },
    sectionTitle: {
        fontSize: 21,
        fontWeight: '700',
        marginTop: spacing.lg - 2,
        marginBottom: spacing.md - 4,
    },
    controls: {
        gap: spacing.sm,
        marginBottom: spacing.md - 4,
    },
});
