import { useLocalSearchParams } from 'expo-router';

import { TaskRouteParams } from '../types/navigation';
import { Task } from '../types/task';
import { useTasks } from './useTasks';

/** Задача, id которой передан в параметрах текущего маршрута (`undefined`, если её нет). */
export function useRouteTask(): Task | undefined {
    const { id } = useLocalSearchParams<TaskRouteParams>();
    const { getTaskById } = useTasks();

    return getTaskById(id);
}
