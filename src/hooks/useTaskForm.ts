import { useCallback, useState } from 'react';

import { CreateTaskInput, Task, TaskDraft } from '../types/task';
import {
    TaskFormErrors,
    taskToFormValues,
    validateTaskForm,
} from '../utils/taskForm';
import { useTaskDraft } from './useTaskDraft';

interface UseTaskFormOptions {
    initialValues?: Task;
    enableDraft?: boolean;
    onSubmit: (input: CreateTaskInput) => void;
}

/** Состояние формы задачи: значения, ошибки, валидация и черновик. */
export function useTaskForm({
    initialValues,
    enableDraft = false,
    onSubmit,
}: UseTaskFormOptions) {
    const [values, setValues] = useState<TaskDraft>(() =>
        taskToFormValues(initialValues),
    );
    const [errors, setErrors] = useState<TaskFormErrors>({});

    const { discardDraft } = useTaskDraft({
        enabled: enableDraft && !initialValues,
        values,
        onRestore: setValues,
    });

    const setField = useCallback(
        <K extends keyof TaskDraft>(field: K, value: TaskDraft[K]) => {
            setValues((prev) => ({ ...prev, [field]: value }));
            setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
        },
        [],
    );

    const submit = () => {
        const result = validateTaskForm(values);
        setErrors(result.errors);

        if (!result.input) {
            return;
        }

        onSubmit(result.input);
        discardDraft();
    };

    return { values, errors, setField, submit };
}
