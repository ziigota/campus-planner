import { useContext } from 'react';

import { GoalContext, type GoalContextValue } from '../context/GoalContext';

export function useWeeklyGoal(): GoalContextValue {
    const context = useContext(GoalContext);

    if (!context) {
        throw new Error('useWeeklyGoal должен использоваться внутри GoalProvider');
    }

    return context;
}
