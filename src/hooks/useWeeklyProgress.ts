import { useMemo } from 'react';

import { countCompletedThisWeek, getGoalRatio } from '../utils/task';
import { useTasks } from './useTasks';
import { useWeeklyGoal } from './useWeeklyGoal';

export interface WeeklyProgress {
    completed: number;
    goal: number;
    ratio: number;
}

export function useWeeklyProgress(): WeeklyProgress {
    const { tasks } = useTasks();
    const { weeklyGoal } = useWeeklyGoal();

    const completed = useMemo(() => countCompletedThisWeek(tasks), [tasks]);

    return {
        completed,
        goal: weeklyGoal,
        ratio: getGoalRatio(completed, weeklyGoal),
    };
}
