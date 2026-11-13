import { Easing, WithSpringConfig, WithTimingConfig } from 'react-native-reanimated';

export const duration = {
    fast: 200,
    normal: 300,
    slow: 600,
} as const;

export const springConfig: WithSpringConfig = {
    damping: 10,
    stiffness: 160,
    mass: 0.6,
};

export const timingConfig: WithTimingConfig = {
    duration: duration.normal,
    easing: Easing.out(Easing.cubic),
};

export const progressTimingConfig: WithTimingConfig = {
    duration: duration.slow,
    easing: Easing.out(Easing.cubic),
};

export const COMPLETED_OPACITY = 0.62;

export const createAnimation = {
    delay: 350,
    offset: 24,
    highlightIn: 200,
    highlightOut: 900,
    highlightOpacity: 0.28,
    windowMs: 2000,
} as const;
