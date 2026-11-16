import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';
import Animated, {
    Extrapolation,
    interpolate,
    SharedValue,
    useAnimatedStyle,
} from 'react-native-reanimated';

import { useTheme } from '../../context/ThemeContext';
import { radius, spacing } from '../../theme/spacing';

interface ExpandToggleProps {
    expanded: boolean;
    progress: SharedValue<number>;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
}
export default function ExpandToggle({
                                         expanded,
                                         progress,
                                         onPress,
                                         style,
                                     }: ExpandToggleProps) {
    const { colors } = useTheme();

    const chevronStyle = useAnimatedStyle(() => ({
        transform: [
            {
                rotate: `${interpolate(progress.value, [0, 1], [0, 180], Extrapolation.CLAMP)}deg`,
            },
        ],
    }));

    return (
        <Pressable
            accessibilityRole="button"
            accessibilityState={{ expanded }}
            onPress={onPress}
            style={({ pressed }) => [
                styles.button,
                {
                    backgroundColor: pressed
                        ? colors.softPressed
                        : colors.inputBackground,
                },
                style,
            ]}
        >
            <Text style={[styles.text, { color: colors.accent }]}>
                {expanded ? 'Скрыть' : 'Подробнее'}
            </Text>
            <Animated.Text style={[styles.chevron, { color: colors.accent }, chevronStyle]}>
                ▾
            </Animated.Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.xs + 2,
        borderRadius: radius.sm,
        paddingVertical: 10,
        paddingHorizontal: spacing.md,
    },
    text: {
        fontSize: 13,
        fontWeight: '700',
    },
    chevron: {
        fontSize: 13,
        fontWeight: '700',
    },
});
