import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { getStoredTheme, setStoredTheme, ThemeName } from '../storage/theme';

export interface ThemeColors {
    background: string;
    card: string;
    cardBorder: string;
    text: string;
    secondaryText: string;
    accent: string;
    accentText: string;
    accentPressed: string;
    softPressed: string;
    cardPressed: string;
    dangerPressed: string;
    inputBackground: string;
    inputBorder: string;
    danger: string;
    dangerText: string;
}

const lightColors: ThemeColors = {
    background: '#F7F3FC',
    card: '#FFFFFF',
    cardBorder: '#E5D8F2',
    text: '#302044',
    secondaryText: '#766582',
    accent: '#613f8e',
    accentText: '#FFFFFF',
    accentPressed: '#633A96',
    softPressed: '#E4D4F5',
    cardPressed: '#F0E7F9',
    dangerPressed: '#DDA9D8',
    inputBackground: '#FCFAFF',
    inputBorder: '#D9C8E9',
    danger: '#F8EAF5',
    dangerText: '#914A88',
};

const darkColors: ThemeColors = {
    background: '#21152E',
    card: '#30203F',
    cardBorder: '#493358',
    text: '#F5ECFC',
    secondaryText: '#C2AFD3',
    accent: '#613f8e',
    accentText: '#24152F',
    accentPressed: '#9D6BD9',
    softPressed: '#49335D',
    cardPressed: '#3B284C',
    dangerPressed: '#794464',
    inputBackground: '#291B37',
    inputBorder: '#594067',
    danger: '#43283F',
    dangerText: '#F0B8E4',
};

interface ThemeContextValue {
    theme: ThemeName;
    colors: ThemeColors;
    isLoading: boolean;
    setTheme: (theme: ThemeName) => void;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
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

    const setTheme = (next: ThemeName) => {
        setThemeState(next);
        setStoredTheme(next);
    };

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    const value = useMemo<ThemeContextValue>(
        () => ({
            theme,
            colors: theme === 'light' ? lightColors : darkColors,
            isLoading,
            setTheme,
            toggleTheme,
        }),
        [theme, isLoading],
    );

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme(): ThemeContextValue {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme должен использоваться внутри ThemeProvider');
    }
    return context;
}
