'use client'

import { useEffect, useState } from "react";
import { QuestionOptionsDto } from '@/backend/domain/dto/question-options';

export const useShowQuestionsOptions = (testId?: string) => {
  const [questionsOptions, setQuestionsOptions] = useState<QuestionOptionsDto[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchQuestionsOptions = async () => {
      if (!testId) return;

      try {
        const response = await fetch(`/api/tests/getQuestionsOptionsByTestId?testId=${testId}`);
        if (!response.ok) {
          setError('QuestionOptionsDto not found');
          return;
        }
        const data: QuestionOptionsDto[] = await response.json();
        setQuestionsOptions(data);
      } catch (error) {
        if (error instanceof Error) setError(error.message);
        return;
      } finally {
        setIsLoading(false);
      }
    };
    fetchQuestionsOptions();
  }, [testId]);

  return { questionsOptions, isLoading, error };
}