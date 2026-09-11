export type TaskPriority = 'low' | 'medium' | 'high';

export type TaskFilter = 'all' | 'active' | 'completed';

export interface Task {
    id: string;
    title: string;
    subject: string;
    durationMinutes: number;
    priority: TaskPriority;
    isCompleted: boolean;
}
