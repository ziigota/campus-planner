import {
    createContext,
    ReactNode,
    useCallback,
    useMemo,
    useRef,
    useState,
} from 'react';

import { initialTasks } from '../data/initialTasks';
import { CreateTaskInput, Task, UpdateTaskInput } from '../types/task';

export interface TasksContextValue {
    tasks: Task[];
    createTask: (input: CreateTaskInput) => Task;
    updateTask: (id: string, input: UpdateTaskInput) => void;
    removeTask: (id: string) => void;
    restoreTask: (task: Task) => void;
    toggleTaskStatus: (id: string) => void;
    getTaskById: (id: string) => Task | undefined;
}

export const TasksContext = createContext<TasksContextValue | undefined>(
    undefined,
);

function withToggledStatus(task: Task): Task {
    if (task.status === 'completed') {
        return { ...task, status: 'active', completedAt: undefined };
    }

    return { ...task, status: 'completed', completedAt: new Date().toISOString() };
}

export function TasksProvider({ children }: { children: ReactNode }) {
    const [tasks, setTasks] = useState<Task[]>(initialTasks);
    const nextId = useRef(initialTasks.length + 1);

    const createTask = useCallback((input: CreateTaskInput): Task => {
        const task: Task = {
            ...input,
            id: String(nextId.current++),
            status: 'active',
            createdAt: new Date().toISOString(),
        };
        setTasks((prev) => [task, ...prev]);
        return task;
    }, []);

    const updateTask = useCallback((id: string, input: UpdateTaskInput) => {
        setTasks((prev) =>
            prev.map((task) => (task.id === id ? { ...task, ...input } : task)),
        );
    }, []);

    const removeTask = useCallback((id: string) => {
        setTasks((prev) => prev.filter((task) => task.id !== id));
    }, []);

    const restoreTask = useCallback((task: Task) => {
        setTasks((prev) => {
            if (prev.some((item) => item.id === task.id)) {
                return prev;
            }
            return [task, ...prev];
        });
    }, []);

    const toggleTaskStatus = useCallback((id: string) => {
        setTasks((prev) =>
            prev.map((task) => (task.id === id ? withToggledStatus(task) : task)),
        );
    }, []);

    const getTaskById = useCallback(
        (id: string) => tasks.find((task) => task.id === id),
        [tasks],
    );

    const value = useMemo<TasksContextValue>(
        () => ({
            tasks,
            createTask,
            updateTask,
            removeTask,
            restoreTask,
            toggleTaskStatus,
            getTaskById,
        }),
        [tasks, createTask, updateTask, removeTask, restoreTask, toggleTaskStatus, getTaskById],
    );

    return (
        <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
    );
}
