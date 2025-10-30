import React, { useContext, useEffect, useState, ReactNode } from 'react';
import { ThemeContext } from './ThemeCore';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = typeof window !== 'undefined' ? window.localStorage.getItem('theme') : null;
      if (saved === 'light' || saved === 'dark') return saved;
      if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    } catch {
      // ignore
    }
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      window.localStorage.setItem('theme', theme);
    } catch {
      // ignore
    }
  }, [theme]);

  // Toggle theme and remove focus from active inputs so :focus-within styles don't persist after theme change
  const toggle = () => {
    if (typeof document !== 'undefined') {
      const active = document.activeElement as HTMLElement | null;
      if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.tagName === 'BUTTON' || active.isContentEditable)) {
        try {
          active.blur();
        } catch {
          // ignore
        }
      }
    }
    setTheme((t) => (t === 'light' ? 'dark' : 'light'));
  };

  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
};

// Keep hook in a separate file to satisfy fast-refresh rules
export const _internal_useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};
