const rawApiUrl = process.env.EXPO_PUBLIC_API_URL ?? '';

export const API_URL = rawApiUrl.trim().replace(/\/+$/, '');

export const API_ROUTES = {
    login: '/auth/login',
    me: '/auth/me',
} as const;

export const HTTP_STATUS = {
    ok: 200,
    badRequest: 400,
    unauthorized: 401,
} as const;

export const JSON_HEADERS = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
} as const;

export const BEARER_PREFIX = 'Bearer';
