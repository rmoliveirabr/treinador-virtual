'use client'

import { useEffect, useState } from "react";

export type Theme = {
  id: string;
  theme: string;
  isActive: boolean;
  userLevel: number;
};

export const useTheme = (themeId: string) => {
  const [theme, setTheme] = useState<Theme | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const data = await fetch(`/api/themes/getTheme?id=${themeId}`).then(response => response.json());
        if (!data) {
          setError(`Theme with id ${themeId} not found`);
          return;
        }
        setTheme(data as Theme);
      } catch (error) {
        if (error instanceof Error) setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchThemes();
  }, [themeId]);

  return { theme, isLoading, error };
}