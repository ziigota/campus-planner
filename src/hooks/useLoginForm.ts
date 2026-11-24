import { useCallback, useRef, useState } from 'react';

import { ApiError } from '../api/errors';
import { useAuth } from '../auth/AuthContext';
import { AUTH_MESSAGES } from '../constants/auth';
import { LoginErrors, LoginInput } from '../types/auth';
import { hasLoginErrors, validateLoginInput } from '../utils/auth';

export function useLoginForm() {
    const { signIn } = useAuth();
    const [values, setValues] = useState<LoginInput>({ login: '', password: '' });
    const [errors, setErrors] = useState<LoginErrors>({});
    const [formError, setFormError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const isSubmittingRef = useRef(false);

    const setField = useCallback(
        <K extends keyof LoginInput>(field: K, value: LoginInput[K]) => {
            setValues((prev) => ({ ...prev, [field]: value }));
            setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
            setFormError(null);
        },
        [],
    );

    const submit = useCallback(async () => {
        if (isSubmittingRef.current) {
            return;
        }

        const validationErrors = validateLoginInput(values);
        setErrors(validationErrors);
        if (hasLoginErrors(validationErrors)) {
            return;
        }

        isSubmittingRef.current = true;
        setIsSubmitting(true);
        setFormError(null);

        try {
            await signIn(values);
        } catch (error) {
            setFormError(
                error instanceof ApiError ? error.message : AUTH_MESSAGES.signInFailed,
            );
            setValues((prev) => ({ ...prev, password: '' }));
        } finally {
            isSubmittingRef.current = false;
            setIsSubmitting(false);
        }
    }, [values, signIn]);

    return { values, errors, formError, isSubmitting, setField, submit };
}
