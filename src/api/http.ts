import { API_URL } from '../constants/api';
import { AUTH_MESSAGES } from '../constants/auth';
import { ApiErrorResponse } from '../types/auth';
import { ApiError } from './errors';

export async function sendRequest(
    path: string,
    init?: RequestInit,
): Promise<Response> {
    if (!API_URL) {
        throw new ApiError(null, AUTH_MESSAGES.missingApiUrl);
    }

    try {
        return await fetch(`${API_URL}${path}`, init);
    } catch {
        throw new ApiError(null, AUTH_MESSAGES.network);
    }
}

export async function readJson(response: Response): Promise<unknown> {
    try {
        return await response.json();
    } catch {
        return null;
    }
}

function isApiErrorResponse(value: unknown): value is ApiErrorResponse {
    return (
        typeof value === 'object' &&
        value !== null &&
        typeof (value as ApiErrorResponse).error === 'string'
    );
}

export async function readErrorMessage(response: Response): Promise<string | null> {
    const body = await readJson(response);
    return isApiErrorResponse(body) ? body.error : null;
}
