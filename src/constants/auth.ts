export const MAX_LOGIN_LENGTH = 64;
export const MAX_PASSWORD_LENGTH = 200;

export const AUTH_MESSAGES = {
    invalidCredentials: 'Неверный логин или пароль.',
    loginRequired: 'Введите логин.',
    loginTooLong: `Логин не длиннее ${MAX_LOGIN_LENGTH} символов.`,
    passwordRequired: 'Введите пароль.',
    passwordTooLong: `Пароль не длиннее ${MAX_PASSWORD_LENGTH} символов.`,
    signInFailed: 'Не удалось выполнить вход. Попробуйте позже.',
    currentUserFailed: 'Не удалось получить данные пользователя.',
    invalidResponse: 'Сервер вернул неожиданный ответ.',
    network: 'Нет связи с сервером. Проверьте подключение к сети.',
    missingApiUrl: 'Не задан адрес сервера (EXPO_PUBLIC_API_URL).',
} as const;
