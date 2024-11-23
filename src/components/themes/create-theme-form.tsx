'use client'

import React from 'react'

import { BackButton } from '@/components/ui/back-button'
import { SubmitButton } from '@/components/ui/submit-button'

import { useCreateTheme } from "@/hooks/themes/use-create-theme"

export function CreateThemeForm() {
  const { handleSubmit, register, errors, onSubmit } = useCreateTheme();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="theme">Assunto: </label>
      <input
        type="text"
        id="theme"
        className="w-200 border rounded-md border-gray-900 border-1 p-1 text-gray-900"
        {...register('theme', { required: 'Assunto é obrigatório!' })}
      />
      {errors.text && <span className="error">{errors.text.message?.toString()}</span>}
      <div className='my-5 space-x-2'>
        <SubmitButton>Gravar</SubmitButton>
        <BackButton>Cancelar</BackButton>
      </div>
    </form>
  );
}
