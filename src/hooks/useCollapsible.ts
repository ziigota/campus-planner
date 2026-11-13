import { useCallback, useState } from 'react';
import {SharedValue, useSharedValue, withDelay, withTiming} from 'react-native-reanimated';

import { timingConfig } from '../theme/animation';

export interface CollapsibleState {
    expanded: boolean;
    progress: SharedValue<number>;
    toggle: () => void;
}

export function useCollapsible(initialExpanded = false): CollapsibleState {
    const [expanded, setExpanded] = useState(initialExpanded);
    const progress = useSharedValue(initialExpanded ? 1 : 0);

    const toggle = useCallback(() => {
        const next = !expanded;
        setExpanded(next);
        progress.value =  withDelay(16,withTiming(next ? 1 : 0, timingConfig));
    }, [expanded, progress]);

    return { expanded, progress, toggle };
}
