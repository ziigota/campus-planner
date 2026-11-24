import { StyleSheet, Text } from 'react-native';

import AppButton from '../../src/components/ui/AppButton';
import AppInput from '../../src/components/ui/AppInput';
import Screen from '../../src/components/ui/Screen';
import { MAX_LOGIN_LENGTH, MAX_PASSWORD_LENGTH } from '../../src/constants/auth';
import { useTheme } from '../../src/context/ThemeContext';
import { useLoginForm } from '../../src/hooks/useLoginForm';
import { spacing } from '../../src/theme/spacing';

export default function LoginScreen() {
    const { colors } = useTheme();
    const { values, errors, formError, isSubmitting, setField, submit } =
        useLoginForm();

    return (
        <Screen scroll>
            <Text style={[styles.title, { color: colors.text }]}>
                Планировщик учебных задач
            </Text>
            <Text style={[styles.subtitle, { color: colors.secondaryText }]}>
                Войдите в учебную учётную запись.
            </Text>

            <AppInput
                label="Логин"
                value={values.login}
                onChangeText={(text) => setField('login', text)}
                error={errors.login}
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="username"
                textContentType="username"
                maxLength={MAX_LOGIN_LENGTH}
                editable={!isSubmitting}
                returnKeyType="next"
            />
            <AppInput
                label="Пароль"
                value={values.password}
                onChangeText={(text) => setField('password', text)}
                error={errors.password}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="current-password"
                textContentType="password"
                maxLength={MAX_PASSWORD_LENGTH}
                editable={!isSubmitting}
                returnKeyType="done"
                onSubmitEditing={submit}
            />

            {formError ? (
                <Text style={[styles.formError, { color: colors.dangerText }]}>
                    {formError}
                </Text>
            ) : null}

            <AppButton
                title={isSubmitting ? 'Входим…' : 'Войти'}
                onPress={submit}
                disabled={isSubmitting}
                style={styles.button}
            />
        </Screen>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: spacing.xs,
    },
    subtitle: {
        fontSize: 14,
        marginBottom: spacing.lg,
    },
    formError: {
        fontSize: 13,
        marginBottom: spacing.sm,
    },
    button: {
        marginTop: spacing.sm,
    },
});
