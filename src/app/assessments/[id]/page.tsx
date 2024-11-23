'use client'

import React from 'react'
import { ShowTest } from '@/components/tests/show-test';

export default function GetAssessmentPage(context: any) {
  const id = context.params.id

  return (
    <main>
      <h1 className="text-center text-3xl">Assessment</h1>
      <div className="my-3 flex justify-start">
        <ShowTest id={id} />
      </div>
    </main>
  )
}