'use client'

import React from 'react'

import { ShowTest } from '@/components/tests/show-test';

export default function GetQuizPage(context: any) {
  const id = context.params.id

  return (
    <main>
      <h1 className="text-center text-3xl">Quiz</h1>
      <div className="my-3 flex justify-start">
        <ShowTest id={id} />
      </div>
    </main>
  )
}