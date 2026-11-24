import { HTTP_STATUS } from '../constants/api';

export class ApiError extends Error {
    readonly status: number | null;

    constructor(status: number | null, message: string) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
    }
}

export function isUnauthorizedError(error: unknown): boolean {
    return error instanceof ApiError && error.status === HTTP_STATUS.unauthorized;
}
