import { StyleSheet, View } from 'react-native';
import Animated, {
    Extrapolation,
    interpolate,
    interpolateColor,
    SharedValue,
    useAnimatedStyle,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '../../context/ThemeContext';

const SIZE = 26;

interface TaskStatusIconProps {
    progress: SharedValue<number>;
}

export default function TaskStatusIcon({ progress }: TaskStatusIconProps) {
    const { colors } = useTheme();
    const { inputBackground, inputBorder, accent, accentText } = colors;

    const circleStyle = useAnimatedStyle(() => ({
        transform: [{ scale: interpolate(progress.value, [0, 0.5, 1], [1, 0.82, 1]) }],
        backgroundColor: interpolateColor(progress.value, [0, 1], [inputBackground, accent]),
        borderColor: interpolateColor(progress.value, [0, 1], [inputBorder, accent]),
    }));

    const checkStyle = useAnimatedStyle(() => ({
        opacity: interpolate(progress.value, [0, 1], [0, 1], Extrapolation.CLAMP),
        transform: [{ scale: interpolate(progress.value, [0, 1], [0.3, 1]) }],
    }));

    return (
        <Animated.View style={[styles.circle, circleStyle]}>
            <Animated.View style={checkStyle}>
                <Ionicons
                    name="checkmark"
                    size={15}
                    color={accentText}
                />
            </Animated.View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    circle: {
        width: SIZE,
        height: SIZE,
        borderRadius: SIZE / 2,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },

});
