import { ReactNode } from 'react';
import { ScrollView, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '../../context/ThemeContext';
import { spacing } from '../../theme/spacing';

interface ScreenProps {
    children: ReactNode;
    scroll?: boolean;
    padded?: boolean;
    centered?: boolean;
    style?: StyleProp<ViewStyle>;
}

export default function Screen({
                                   children,
                                   scroll = false,
                                   padded = true,
                                   centered = false,
                                   style,
                               }: ScreenProps) {
    const { colors } = useTheme();

    const contentStyle = [
        padded && styles.padded,
        centered && styles.centered,
        style,
    ];

    return (
        <SafeAreaView
            edges={['left', 'right', 'bottom']}
            style={[styles.root, { backgroundColor: colors.background }]}
        >
            {scroll ? (
                <ScrollView
                    contentContainerStyle={contentStyle}
                    keyboardShouldPersistTaps="handled"
                >
                    {children}
                </ScrollView>
            ) : (
                <View style={[styles.fill, contentStyle]}>{children}</View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    fill: {
        flex: 1,
    },
    padded: {
        padding: spacing.md,
    },
    centered: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
