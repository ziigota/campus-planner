import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
    interpolateColor,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

import { useTheme } from '../../context/ThemeContext';
import { progressTimingConfig } from '../../theme/animation';
import { radius } from '../../theme/spacing';
import { clamp } from '../../utils/math';

interface ProgressBarProps {
    value: number;
}

export default function ProgressBar({ value }: ProgressBarProps) {
    const { colors } = useTheme();
    const { accent, accentDivider } = colors;

    const target = clamp(value, 0, 1);
    const progress = useSharedValue(0);

    useEffect(() => {
        progress.value = withTiming(target, progressTimingConfig);
    }, [target, progress]);

    const fillStyle = useAnimatedStyle(() => ({
        width: `${progress.value * 100}%`,
        backgroundColor: interpolateColor(progress.value, [0, 1], [accentDivider, accent]),
    }));

    return (
        <View
            accessibilityRole="progressbar"
            accessibilityValue={{ min: 0, max: 100, now: Math.round(target * 100) }}
            style={[styles.track, { backgroundColor: colors.softPressed }]}
        >
            <Animated.View style={[styles.fill, fillStyle]} />
        </View>
    );
}

const styles = StyleSheet.create({
    track: {
        height: 10,
        borderRadius: radius.sm,
        overflow: 'hidden',
    },
    fill: {
        height: '100%',
        borderRadius: radius.sm,
    },
});
