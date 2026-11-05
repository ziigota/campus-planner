const DATE_ONLY_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

/** Проверяет строку формата ГГГГ-ММ-ДД и существование такой даты в календаре. */
export function isValidDateOnly(value: string): boolean {
    return parseDateOnly(value) !== null;
}

function parseDateOnly(value: string): Date | null {
    const match = DATE_ONLY_PATTERN.exec(value);
    if (!match) {
        return null;
    }

    const year = Number(match[1]);
    const month = Number(match[2]);
    const day = Number(match[3]);

    // Конец указанного дня по локальному времени: задача просрочена только после него.
    const date = new Date(year, month - 1, day, 23, 59, 59, 999);

    const isSameDay =
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day;

    return isSameDay ? date : null;
}

/** Срок выполнения как момент времени (для `ГГГГ-ММ-ДД` — конец этого дня). */
export function parseDueDate(value: string): Date | null {
    if (DATE_ONLY_PATTERN.test(value)) {
        return parseDateOnly(value);
    }

    const timestamp = Date.parse(value);
    return Number.isNaN(timestamp) ? null : new Date(timestamp);
}

/** `2026-10-20` → `20.10.2026`. */
export function formatDueDate(value: string): string {
    const match = DATE_ONLY_PATTERN.exec(value);
    if (match) {
        return `${match[3]}.${match[2]}.${match[1]}`;
    }

    const date = parseDueDate(value);
    return date ? date.toLocaleDateString('ru-RU') : value;
}
