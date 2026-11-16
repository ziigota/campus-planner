import { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Animated, {FadeInDown,  FadeOutLeft} from 'react-native-reanimated';

import { duration } from '../../theme/animation';

interface AnimatedListItemProps {
    children: ReactNode;
    style?: StyleProp<ViewStyle>;
}

export default function AnimatedListItem({ children, style }: AnimatedListItemProps) {
    return (
        <Animated.View
            entering={FadeInDown.duration(duration.normal)}
            exiting={FadeOutLeft.duration(duration.normal)}
            style={style}
        >
            {children}
        </Animated.View>
    );
}
