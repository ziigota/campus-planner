import { AUTH_MESSAGES, MAX_LOGIN_LENGTH, MAX_PASSWORD_LENGTH } from '../constants/auth';
import { LoginErrors, LoginInput } from '../types/auth';

export function validateLoginInput({ login, password }: LoginInput): LoginErrors {
    const errors: LoginErrors = {};
    const trimmedLogin = login.trim();
    const trimmedPassword = password.trim();

    if (!trimmedLogin) {
        errors.login = AUTH_MESSAGES.loginRequired;
    } else if (trimmedLogin.length > MAX_LOGIN_LENGTH) {
        errors.login = AUTH_MESSAGES.loginTooLong;
    }

    if (!trimmedPassword) {
        errors.password = AUTH_MESSAGES.passwordRequired;
    } else if (trimmedPassword.length > MAX_PASSWORD_LENGTH) {
        errors.password = AUTH_MESSAGES.passwordTooLong;
    }

    return errors;
}

export function hasLoginErrors(errors: LoginErrors): boolean {
    return Boolean(errors.login || errors.password);
}
