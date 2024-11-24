'use client'

import React from 'react';

import { useTheme } from '@/hooks/themes/use-theme';
import { InformationList } from '@/components/information/information-list';
import { TestList } from '@/components/tests/test-list';
import Star from "@/components/ui/star";

export default function ThemePage(context: any) {
  const themeId = context.params.id;
  const { theme, isLoading, error } = useTheme(themeId);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (isLoading || !theme) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <h1 className="page-title">Assunto: {theme.theme}</h1>
      <div className='my-3'>
        <h2>Nível: <Star stars={theme.userLevel} /></h2>
      </div>
      <div className='my-3'>
        <h2>Treinamento</h2>
        <InformationList themeId={themeId} />
      </div>
      <div className='my-3'>
        <h2>Assessments</h2>
        <TestList themeId={themeId} type="assessment" />
      </div>
    </main>);
}

