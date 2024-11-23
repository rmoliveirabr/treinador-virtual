'use client'

import { useEffect, useState } from "react";

export type TestType = 'quiz' | 'assessment';

export type Test = {
  id: string;
  creationDate: Date;
  userExecutionDate?: Date;
  type?: TestType;
  theme: { id: string, theme: string };
  informationId?: string;
}

export const useShowTest = (id: string) => {
  const [test, setTest] = useState<Test>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const response = await fetch(`/api/tests/getTest?id=${id}`);
        if (!response.ok) {
          setError('Test not found');
          return;
        }
        const data: Test = await response.json();
        setTest(data);
      } catch (error) {
        if (error instanceof Error) setError(error.message);
        return;
      } finally {
        setIsLoading(false);
      }
    };
    fetchTest();
  }, [id]);

  return { test, isLoading, error };
}