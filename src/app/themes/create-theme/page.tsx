import React from 'react';

import { CreateThemeForm } from '@/components/themes/create-theme-form';

export default function CreateThemePage() {
  return (
    <main>
      <h1 className="page-title">Novo Assunto</h1>
      <div className='my-3'>
        <CreateThemeForm />
      </div>
    </main>
  )
}