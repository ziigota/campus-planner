import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';

import { getCurrentUser, signIn as requestSignIn } from '../api/auth';
import { isUnauthorizedError } from '../api/errors';
import { LoginInput, User } from '../types/auth';
import { readToken, removeToken, saveToken } from './authStorage';

interface AuthContextValue {
    user: User | null;
    accessToken: string | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    signIn: (credentials: LoginInput) => Promise<void>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        (async () => {
            try {
                const storedToken = await readToken();
                if (!storedToken) {
                    return;
                }

                const currentUser = await getCurrentUser(storedToken);
                if (isMounted) {
                    setAccessToken(storedToken);
                    setUser(currentUser);
                }
            } catch (error) {
                if (isUnauthorizedError(error)) {
                    await removeToken();
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        })();

        return () => {
            isMounted = false;
        };
    }, []);

    const signIn = useCallback(async (credentials: LoginInput) => {
        const response = await requestSignIn(credentials);

        await saveToken(response.accessToken);
        setAccessToken(response.accessToken);
        setUser(response.user);
    }, []);

    const signOut = useCallback(async () => {
        await removeToken();
        setAccessToken(null);
        setUser(null);
    }, []);

    const value = useMemo<AuthContextValue>(
        () => ({
            user,
            accessToken,
            isLoading,
            isAuthenticated: user !== null && accessToken !== null,
            signIn,
            signOut,
        }),
        [user, accessToken, isLoading, signIn, signOut],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth должен использоваться внутри AuthProvider');
    }
    return context;
}
