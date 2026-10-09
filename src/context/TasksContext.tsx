import React, { createContext, useContext, useMemo, useState } from 'react';
import { Task } from '../types/task';
const initialTasks: Task[] = [
    {
        id: '1',
        title: 'Утренняя пробежка',
        subject: 'Кардио',
        durationMinutes: 30,
        priority: 'medium',
        isCompleted: false,
    },
    {
        id: '2',
        title: 'Силовая тренировка',
        subject: 'Силовая',
        durationMinutes: 60,
        priority: 'high',
        isCompleted: false,
    },
];

export type NewTaskInput = Omit<Task, 'id' | 'isCompleted'>;
export type TaskUpdateInput = Omit<Task, 'id' | 'isCompleted'>;

interface TasksContextValue {
    tasks: Task[];
    getTaskById: (id: string) => Task | undefined;
    addTask: (input: NewTaskInput) => void;
    updateTask: (id: string, input: TaskUpdateInput) => void;
    toggleTask: (id: string) => void;
    deleteTask: (id: string) => void;
}

const TasksContext = createContext<TasksContextValue | undefined>(undefined);

let nextId = initialTasks.length + 1;

export function TasksProvider({ children }: { children: React.ReactNode }) {
    const [tasks, setTasks] = useState<Task[]>(initialTasks);

    const getTaskById = (id: string) => tasks.find((task) => task.id === id);

    const addTask = (input: NewTaskInput) => {
        const task: Task = {
            id: String(nextId++),
            isCompleted: false,
            ...input,
        };
        setTasks((prev) => [task, ...prev]);
    };

    const updateTask = (id: string, input: TaskUpdateInput) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id ? { ...task, ...input } : task,
            ),
        );
    };

    const toggleTask = (id: string) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id
                    ? { ...task, isCompleted: !task.isCompleted }
                    : task,
            ),
        );
    };

    const deleteTask = (id: string) => {
        setTasks((prev) => prev.filter((task) => task.id !== id));
    };

    const value = useMemo<TasksContextValue>(
        () => ({
            tasks,
            getTaskById,
            addTask,
            updateTask,
            toggleTask,
            deleteTask,
        }),
        [tasks],
    );

    return (
        <TasksContext.Provider value={value}>
            {children}
        </TasksContext.Provider>
    );
}

export function useTasks(): TasksContextValue {
    const context = useContext(TasksContext);
    if (!context) {
        throw new Error('useTasks должен использоваться внутри TasksProvider');
    }
    return context;
}
