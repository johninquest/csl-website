import { en } from './locales/en';
import { de } from './locales/de';
import { fr } from './locales/fr';

export const languages = {
    en: 'English',
    de: 'Deutsch', 
    fr: 'Français'
};

export const defaultLang = 'en';

export const ui = {
    en,
    de,
    fr
} as const;

export function getLangFromUrl(url: URL) {
    const [, lang] = url.pathname.split('/');
    if (lang in ui) return lang as keyof typeof ui;
    return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
    return function t(key: keyof typeof ui[typeof defaultLang]) {
        return ui[lang][key] || ui[defaultLang][key];
    }
}