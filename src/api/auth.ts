import { API_ROUTES, HTTP_STATUS, JSON_HEADERS } from '../constants/api';
import { AUTH_MESSAGES } from '../constants/auth';
import { LoginInput, LoginResponse, User } from '../types/auth';
import { authorizedFetch } from './authorizedFetch';
import { ApiError } from './errors';
import { readErrorMessage, readJson, sendRequest } from './http';

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null;
}

function isUser(value: unknown): value is User {
    return (
        isRecord(value) &&
        typeof value.id === 'string' &&
        typeof value.login === 'string' &&
        typeof value.name === 'string'
    );
}

function isLoginResponse(value: unknown): value is LoginResponse {
    return (
        isRecord(value) &&
        typeof value.accessToken === 'string' &&
        value.accessToken.length > 0 &&
        typeof value.expiresIn === 'number' &&
        isUser(value.user)
    );
}

export async function signIn(credentials: LoginInput): Promise<LoginResponse> {
    const response = await sendRequest(API_ROUTES.login, {
        method: 'POST',
        headers: JSON_HEADERS,
        body: JSON.stringify({
            login: credentials.login.trim(),
            password: credentials.password,
        }),
    });

    if (!response.ok) {
        const serverMessage = await readErrorMessage(response);
        const message =
            response.status === HTTP_STATUS.unauthorized
                ? AUTH_MESSAGES.invalidCredentials
                : serverMessage ?? AUTH_MESSAGES.signInFailed;
        throw new ApiError(response.status, message);
    }

    const body = await readJson(response);
    if (!isLoginResponse(body)) {
        throw new ApiError(response.status, AUTH_MESSAGES.invalidResponse);
    }

    return body;
}

export async function getCurrentUser(token: string): Promise<User> {
    const response = await authorizedFetch(token, API_ROUTES.me);

    if (!response.ok) {
        const serverMessage = await readErrorMessage(response);
        throw new ApiError(
            response.status,
            serverMessage ?? AUTH_MESSAGES.currentUserFailed,
        );
    }

    const body = await readJson(response);
    if (!isRecord(body) || !isUser(body.user)) {
        throw new ApiError(response.status, AUTH_MESSAGES.invalidResponse);
    }

    return body.user;
}
