import {
    createContext,
    ReactNode,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';

import {
    DEFAULT_WEEKLY_GOAL,
    MAX_WEEKLY_GOAL,
    MIN_WEEKLY_GOAL,
} from '../constants/goal';
import { getStoredGoal, setStoredGoal } from '../storage/goal';
import { clamp } from '../utils/math';

export interface GoalContextValue {
    weeklyGoal: number;
    setWeeklyGoal: (goal: number) => void;
}

export const GoalContext = createContext<GoalContextValue | undefined>(undefined);

export function GoalProvider({ children }: { children: ReactNode }) {
    const [weeklyGoal, setGoalState] = useState(DEFAULT_WEEKLY_GOAL);

    useEffect(() => {
        let isMounted = true;

        (async () => {
            const stored = await getStoredGoal();
            if (isMounted && stored !== null) {
                setGoalState(stored);
            }
        })();

        return () => {
            isMounted = false;
        };
    }, []);

    const setWeeklyGoal = useCallback((goal: number) => {
        const next = clamp(Math.round(goal), MIN_WEEKLY_GOAL, MAX_WEEKLY_GOAL);
        setGoalState(next);
        void setStoredGoal(next);
    }, []);

    const value = useMemo<GoalContextValue>(
        () => ({ weeklyGoal, setWeeklyGoal }),
        [weeklyGoal, setWeeklyGoal],
    );

    return <GoalContext.Provider value={value}>{children}</GoalContext.Provider>;
}
