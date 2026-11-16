import { Task } from '../types/task';

export const initialTasks: Task[] = [
    {
        id: '1',
        title: 'Утренняя пробежка',
        subject: 'Кардио',
        durationMinutes: 30,
        priority: 'medium',
        status: 'active',
        createdAt: '2026-10-01T08:00:00.000Z',
        note: 'Лёгкий темп, 5 км',
    },
    {
        id: '2',
        title: 'Силовая тренировка',
        subject: 'Силовая',
        durationMinutes: 60,
        priority: 'high',
        status: 'active',
        createdAt: '2026-10-01T09:00:00.000Z',
        note: 'Жим, присед, становая',
    },
    {
        id: '3',
        title: 'Силовая тренировка',
        subject: 'Силовая',
        durationMinutes: 60,
        priority: 'high',
        status: 'active',
        createdAt: '2026-10-01T09:00:00.000Z',
        note: 'Жим, присед, становая',
    },
    {
        id: '4',
        title: 'Силовая тренировка',
        subject: 'Силовая',
        durationMinutes: 60,
        priority: 'high',
        status: 'active',
        createdAt: '2026-10-01T09:00:00.000Z',
        note: 'Жим, присед, становая',
    },
];
