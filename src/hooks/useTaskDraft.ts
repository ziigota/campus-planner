import { useCallback, useEffect, useRef } from 'react';
import { Alert } from 'react-native';

import { clearDraft, getDraft, saveDraft } from '../storage/draft';
import { TaskDraft } from '../types/task';

interface UseTaskDraftOptions {
    enabled: boolean;
    values: TaskDraft;
    onRestore: (draft: TaskDraft) => void;
}

/**
 * Автосохранение черновика формы и предложение восстановить его при открытии.
 * Пока пользователь не ответил на вопрос о восстановлении, черновик не перезаписывается.
 */
export function useTaskDraft({ enabled, values, onRestore }: UseTaskDraftOptions) {
    const hydrated = useRef(!enabled);
    const onRestoreRef = useRef(onRestore);

    useEffect(() => {
        onRestoreRef.current = onRestore;
    });

    useEffect(() => {
        if (!enabled) {
            return;
        }

        let isMounted = true;

        (async () => {
            const draft = await getDraft();
            if (!isMounted || !draft) {
                hydrated.current = true;
                return;
            }

            Alert.alert(
                'Восстановить черновик?',
                'У вас есть незавершённая задача. Восстановить введённые данные?',
                [
                    {
                        text: 'Нет, начать заново',
                        style: 'cancel',
                        onPress: () => {
                            void clearDraft();
                            hydrated.current = true;
                        },
                    },
                    {
                        text: 'Восстановить',
                        onPress: () => {
                            onRestoreRef.current(draft);
                            hydrated.current = true;
                        },
                    },
                ],
            );
        })();

        return () => {
            isMounted = false;
        };
    }, [enabled]);

    useEffect(() => {
        if (!enabled || !hydrated.current) {
            return;
        }

        void saveDraft(values);
    }, [enabled, values]);

    const discardDraft = useCallback(() => {
        if (enabled) {
            void clearDraft();
        }
    }, [enabled]);

    return { discardDraft };
}
