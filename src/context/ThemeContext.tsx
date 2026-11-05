import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';

import { getStoredTheme, setStoredTheme } from '../storage/theme';
import { ThemeColors, themeColors } from '../theme/colors';
import { ThemeName } from '../types/theme';

interface ThemeContextValue {
    theme: ThemeName;
    colors: ThemeColors;
    isLoading: boolean;
    setTheme: (theme: ThemeName) => void;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setThemeState] = useState<ThemeName>('light');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        (async () => {
            const stored = await getStoredTheme();
            if (isMounted && stored) {
                setThemeState(stored);
            }
            if (isMounted) {
                setIsLoading(false);
            }
        })();

        return () => {
            isMounted = false;
        };
    }, []);

    const setTheme = useCallback((next: ThemeName) => {
        setThemeState(next);
        void setStoredTheme(next);
    }, []);

    const toggleTheme = useCallback(() => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    }, [theme, setTheme]);

    const value = useMemo<ThemeContextValue>(
        () => ({
            theme,
            colors: themeColors[theme],
            isLoading,
            setTheme,
            toggleTheme,
        }),
        [theme, isLoading, setTheme, toggleTheme],
    );

    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
}

export function useTheme(): ThemeContextValue {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme должен использоваться внутри ThemeProvider');
    }
    return context;
}
