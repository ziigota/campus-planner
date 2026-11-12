const DATE_ONLY_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

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

    const date = new Date(year, month - 1, day, 23, 59, 59, 999);

    const isSameDay =
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day;

    return isSameDay ? date : null;
}

export function parseDueDate(value: string): Date | null {
    if (DATE_ONLY_PATTERN.test(value)) {
        return parseDateOnly(value);
    }

    const timestamp = Date.parse(value);
    return Number.isNaN(timestamp) ? null : new Date(timestamp);
}

export function formatDate(value: string): string {
    const match = DATE_ONLY_PATTERN.exec(value);
    if (match) {
        return `${match[3]}.${match[2]}.${match[1]}`;
    }

    const date = parseDueDate(value);
    return date ? date.toLocaleDateString('ru-RU') : value;
}

export function toDateOnly(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

export function getWeekStart(now: Date = new Date()): Date {
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const daysSinceMonday = (start.getDay() + 6) % 7;
    start.setDate(start.getDate() - daysSinceMonday);
    return start;
}

export function isInCurrentWeek(value: string, now: Date = new Date()): boolean {
    const timestamp = Date.parse(value);
    if (Number.isNaN(timestamp)) {
        return false;
    }

    const weekStart = getWeekStart(now);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 7);

    return timestamp >= weekStart.getTime() && timestamp < weekEnd.getTime();
}
