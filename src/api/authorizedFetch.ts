import { BEARER_PREFIX } from '../constants/api';
import { sendRequest } from './http';

export function authorizedFetch(
    token: string,
    path: string,
    init: RequestInit = {},
): Promise<Response> {
    const headers = new Headers(init.headers);
    headers.set('Authorization', `${BEARER_PREFIX} ${token}`);

    return sendRequest(path, { ...init, headers });
}
