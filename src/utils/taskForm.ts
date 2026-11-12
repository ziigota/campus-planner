import { CreateTaskInput, Task, TaskDraft } from '../types/task';
import { isValidDateOnly } from './date';

export type TaskFormErrors = Partial<Record<keyof TaskDraft, string>>;

export interface TaskFormValidation {
    errors: TaskFormErrors;
    input: CreateTaskInput | null;
}

export function taskToFormValues(task?: Task): TaskDraft {
    if (!task) {
        return {
            title: '',
            subject: '',
            duration: '',
            dueDate: '',
            note: '',
            priority: 'medium',
        };
    }

    return {
        title: task.title,
        subject: task.subject,
        duration: String(task.durationMinutes),
        dueDate: task.dueDate ?? '',
        note: task.note ?? '',
        priority: task.priority,
    };
}

export function validateTaskForm(values: TaskDraft): TaskFormValidation {
    const title = values.title.trim();
    const subject = values.subject.trim();
    const durationText = values.duration.trim();
    const durationMinutes = Number(durationText);
    const dueDate = values.dueDate.trim();
    const note = values.note.trim();

    const errors: TaskFormErrors = {};

    if (!title) {
        errors.title = 'Введите название задачи';
    }

    if (!subject) {
        errors.subject = 'Введите предмет';
    }

    if (
        !durationText ||
        !Number.isFinite(durationMinutes) ||
        durationMinutes <= 0
    ) {
        errors.duration = 'Введите длительность в минутах (больше нуля)';
    }

    if (dueDate && !isValidDateOnly(dueDate)) {
        errors.dueDate = 'Укажите дату в формате ГГГГ-ММ-ДД';
    }

    if (Object.keys(errors).length > 0) {
        return { errors, input: null };
    }

    return {
        errors,
        input: {
            title,
            subject,
            durationMinutes,
            priority: values.priority,
            dueDate: dueDate || undefined,
            note: note || undefined,
        },
    };
}
