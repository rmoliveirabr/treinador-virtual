'use client'

import React from 'react';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export const BackButton: React.FC<React.PropsWithChildren> = ({ children }) => {
  const router = useRouter();

  const handleBack = (event: any) => {
    event.preventDefault();
    router.back();
  };

  return (
    <Button asChild className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded">
      <Link href={'#'} onClick={handleBack}>
        {children}
      </Link>
    </Button>
  );
}