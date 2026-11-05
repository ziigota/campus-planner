export type TaskStatus = 'active' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high';

export type TaskFilter = 'all' | TaskStatus;
export type TaskSortMode = 'created' | 'priority';

export interface Task {
    id: string;
    title: string;
    subject: string;
    durationMinutes: number;
    priority: TaskPriority;
    status: TaskStatus;
    createdAt: string;
    dueDate?: string;
}

export type CreateTaskInput = Omit<Task, 'id' | 'createdAt' | 'status'>;
export type UpdateTaskInput = Partial<CreateTaskInput> & {
    status?: TaskStatus;
};

export interface TaskCounts {
    total: number;
    active: number;
    completed: number;
}

export interface TaskDraft extends Pick<Task, 'title' | 'subject' | 'priority'> {
    duration: string;
    dueDate: string;
}
