import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
    Extrapolation,
    interpolate,
    SharedValue,
    useAnimatedStyle,
    useSharedValue,
} from 'react-native-reanimated';

interface CollapsibleProps {
    progress: SharedValue<number>;
    children: ReactNode;
}

export default function Collapsible({ progress, children }: CollapsibleProps) {
    const contentHeight = useSharedValue(0);

    const wrapperStyle = useAnimatedStyle(() => ({
        height: interpolate(
            progress.value,
            [0, 1],
            [0, contentHeight.value],
            Extrapolation.CLAMP,
        ),
        opacity: interpolate(progress.value, [0, 1], [0, 1], Extrapolation.CLAMP),
    }));

    return (
        <Animated.View style={[styles.wrapper, wrapperStyle]}>
            <View
                style={styles.content}
                onLayout={(event) => {
                    contentHeight.value = event.nativeEvent.layout.height;
                }}
            >
                {children}
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        overflow: 'hidden',
    },
    content: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
});
