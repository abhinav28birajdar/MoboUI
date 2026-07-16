import { useTheme as useNextTheme } from 'next-themes';

export function useTheme() {
  const { theme, setTheme, resolvedTheme } = useNextTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return {
    theme: theme || 'dark',
    resolvedTheme: resolvedTheme || 'dark',
    isDark: resolvedTheme === 'dark',
    setTheme,
    toggleTheme,
  };
}
