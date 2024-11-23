'use client'

import { useEffect, useState, useContext } from "react";
import { ThemeContext } from '@/contexts/theme-context';

export type Theme = {
  id: string;
  theme: string;
  isActive: boolean;
};

export const useActiveThemeList = () => {
  const [activeThemes, setActiveThemes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  const { refreshThemeList, setRefreshThemeList } = useContext(ThemeContext);

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const data = await fetch('/api/themes/getActiveThemes').then(response => response.json());
        if (!data) {
          setError('Themes not found');
          return;
        }
        setActiveThemes(data);
      } catch (error) {
        if (error instanceof Error) setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    if (refreshThemeList) {
      fetchThemes();
      setRefreshThemeList(false);
    }
  }, [refreshThemeList, setRefreshThemeList]);

  return { activeThemes, isLoading, error };
}