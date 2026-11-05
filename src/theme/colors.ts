import { ThemeName } from '../types/theme';

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
    /** Текст и разделители на фоне акцентной карточки статистики. */
    onAccent: string;
    onAccentMuted: string;
    accentDivider: string;
}

export const lightColors: ThemeColors = {
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
    onAccent: '#FFFFFF',
    onAccentMuted: '#EDE3F8',
    accentDivider: '#B99BD2',
};

export const darkColors: ThemeColors = {
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
    onAccent: '#FFFFFF',
    onAccentMuted: '#EDE3F8',
    accentDivider: '#B99BD2',
};

export const themeColors: Record<ThemeName, ThemeColors> = {
    light: lightColors,
    dark: darkColors,
};
