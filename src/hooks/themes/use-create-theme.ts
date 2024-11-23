'use client';

import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { ThemeContext } from '@/contexts/theme-context';

export function useCreateTheme() {
  const router = useRouter()

  const { handleSubmit, register, formState: { errors } } = useForm();
  const { setRefreshThemeList } = useContext(ThemeContext);

  const onSubmit = async (data: any) => {
    const response = await fetch('/api/themes/createTheme', {
      method: 'POST',
      headers: {
        'Content-Type': 'application:json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    setRefreshThemeList(true);

    const createdTheme = await response.json();
    router.push(`/themes/${createdTheme.id}`); // Redirect to new theme page
  }

  return { handleSubmit, register, errors, onSubmit };
}
