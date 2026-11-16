import DateTimePicker, {
    DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { CalendarDays } from 'lucide-react-native';

import { useTheme } from '../../context/ThemeContext';
import { radius, spacing } from '../../theme/spacing';
import { formatDate, parseDueDate, toDateOnly } from '../../utils/date';
import AppButton from './AppButton';

interface DateFieldProps {
    label?: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
    placeholder?: string;
}

export default function DateField({
                                      label,
                                      value,
                                      onChange,
                                      error,
                                      placeholder = 'Выберите дату',
                                  }: DateFieldProps) {
    const { theme, colors } = useTheme();
    const [isPickerVisible, setPickerVisible] = useState(false);

    const pickerDate = (value ? parseDueDate(value) : null) ?? new Date();

    const handleChange = (event: DateTimePickerEvent, selected?: Date) => {
        if (Platform.OS === 'android') {
            setPickerVisible(false);
            if (event.type === 'set' && selected) {
                onChange(toDateOnly(selected));
            }
            return;
        }
        if (selected) {
            onChange(toDateOnly(selected));
        }
    };

    return (
        <View style={styles.wrapper}>
            {label ? (
                <Text style={[styles.label, { color: colors.secondaryText }]}>
                    {label}
                </Text>
            ) : null}

            <Pressable
                accessibilityRole="button"
                onPress={() => setPickerVisible((visible) => !visible)}
                style={[
                    styles.field,
                    {
                        borderColor: error ? colors.dangerText : colors.inputBorder,
                        backgroundColor: colors.inputBackground,
                    },
                ]}
            >
                <Text style={{ color: value ? colors.text : colors.secondaryText }}>
                    {value ? formatDate(value) : placeholder}
                </Text>
                <CalendarDays size={18} color={colors.accent} />
            </Pressable>

            {error ? (
                <Text style={[styles.error, { color: colors.dangerText }]}>{error}</Text>
            ) : null}

            {value ? (
                <AppButton
                    title="Очистить дату"
                    variant="link"
                    size="sm"
                    onPress={() => onChange('')}
                    style={styles.clear}
                />
            ) : null}

            {isPickerVisible ? (
                <DateTimePicker
                    value={pickerDate}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'inline' : 'default'}
                    locale="ru-RU"
                    themeVariant={theme}
                    accentColor={colors.accent}
                    onChange={handleChange}
                />
            ) : null}

            {isPickerVisible && Platform.OS === 'ios' ? (
                <AppButton
                    title="Готово"
                    size="sm"
                    onPress={() => setPickerVisible(false)}
                />
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: spacing.sm + spacing.xs,
    },
    label: {
        fontSize: 13,
        fontWeight: '600',
        marginBottom: spacing.xs + 2,
    },
    field: {
        height: 46,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderRadius: radius.md - 2,
        paddingHorizontal: spacing.sm + spacing.xs,
    },
    icon: {
        fontSize: 16,
    },
    error: {
        fontSize: 12,
        marginTop: spacing.xs,
    },
    clear: {
        alignSelf: 'flex-start',
        marginTop: spacing.xs,
    },
});
