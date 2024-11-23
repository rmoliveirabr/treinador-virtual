'use client'

import React from 'react';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export type SubmitButtonProps = {
  children: React.ReactNode;
  disabled?: boolean;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ children, disabled = false }) => {
  const router = useRouter();

  // const handleBack = (e: any) => {
  //   e.preventDefault();
  //   router.back();
  // };

  return (
    <Button type="submit" className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded" disabled={disabled}>
      {children}
    </Button>
  );
}