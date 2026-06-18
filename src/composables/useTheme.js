import { ref, watch } from 'vue';
export const themes = [
    { id: 'day', label: 'Day', color: '#c3eaf7' },
    { id: 'night', label: 'Night', color: '#1a1a2e' },
    { id: 'sunset', label: 'Sunset', color: '#f4a261' },
    { id: 'sakura', label: 'Sakura', color: '#f5c6d0' },
    { id: 'forest', label: 'Forest', color: '#4a7c59' },
    { id: 'snow', label: 'Snow', color: '#d4dde7' },
];
const STORAGE_KEY = 'sansan-reserve-theme';
const currentTheme = ref(localStorage.getItem(STORAGE_KEY) || 'day');
function applyTheme(theme) {
    const body = document.body;
    themes.forEach(t => body.classList.remove(`theme-${t.id}`));
    if (theme !== 'day') {
        body.classList.add(`theme-${theme}`);
    }
}
// Apply on init
applyTheme(currentTheme.value);
watch(currentTheme, (newTheme) => {
    applyTheme(newTheme);
    localStorage.setItem(STORAGE_KEY, newTheme);
});
export function useTheme() {
    const setTheme = (theme) => {
        currentTheme.value = theme;
    };
    const nextTheme = () => {
        const idx = themes.findIndex(t => t.id === currentTheme.value);
        const next = themes[(idx + 1) % themes.length];
        setTheme(next.id);
    };
    return {
        currentTheme,
        themes,
        setTheme,
        nextTheme,
    };
}
