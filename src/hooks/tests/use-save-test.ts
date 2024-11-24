'use client'

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useContext } from 'react';
import { showToast } from '@/components/ui/toast';

import { QuestionOptionsDto, AnswersDto } from '@/backend/domain/dto/question-options';

import { ThemeContext } from '@/contexts/theme-context';

export function useSaveTest(questionsOptions: QuestionOptionsDto[]) {
  const router = useRouter();
  const { handleSubmit, register, formState: { errors }, watch } = useForm();

  const [answers, setAnswers] = useState<AnswersDto>({});

  const { setRefreshThemeList } = useContext(ThemeContext);

  useEffect(() => {
    if (questionsOptions) {
      let initialAnswers: AnswersDto = {};

      initialAnswers = questionsOptions.reduce((acc, question: QuestionOptionsDto) => {
        acc[question.id] = question.userAnswerId || '';
        return acc;
      }, initialAnswers);
      setAnswers(initialAnswers);
    }
  }, [questionsOptions]);

  useEffect(() => {
    const subscription = watch((data) => {
      Object.keys(data).forEach((key) => {
        const element = document.getElementById(data[key]) as HTMLInputElement;
        if (!element || element.readOnly) return;

        setAnswers((prevAnswers) => ({
          ...prevAnswers,
          [key]: data[key],
        }));
      });
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = async (data: any) => {
    // console.log('data', data);

    // save test answers
    const response = await fetch('/api/tests/saveTestAnswers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application:json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.log('error:', response);
      const error = await response.json();
      throw new Error(error.message);
    }

    // get total questions and correct answers, show to user
    const { totalQuestions, totalCorrectAnswers } = await response.json();

    // create toast message
    let toastMessage = `Teste gravado com sucesso!\n${totalCorrectAnswers} de ${totalQuestions} respostas estavam corretas.`;

    // saved successfully, calculate level
    if (data.param_testType === 'assessment') {
      const response = await fetch(`/api/tests/adjustLevel?themeId=${data.param_themeId}&testId=${data.param_testId}`);

      if (!response.ok) {
        console.log('error:', response);
        const error = await response.json();
        throw new Error(error.message);
      }

      const { oldLevel, newLevel } = await response.json();
      toastMessage += `\nNivel ajustado de ${oldLevel} para ${newLevel}.`;

      setRefreshThemeList(true);
    }

    showToast({
      message: toastMessage,
      type: 'success',
      button: {
        text: 'Ok',
        onClick: () => router.push(`/themes/${data.param_themeId}`),
      },
    });
  }

  return { handleSubmit, register, errors, onSubmit, watch, answers };
}