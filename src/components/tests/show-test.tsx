'use client'

import React from 'react'

import Image from 'next/image';

import { useShowTest } from '@/hooks/tests/use-show-test';
import { useShowQuestionsOptions } from '@/hooks/tests/use-show-questions-options';
import { useSaveTest } from '@/hooks/tests/use-save-test';
import { QuestionOptionsDto, AnswersDto } from '@/backend/domain/dto/question-options';

import { formatDate, capitalizeFirstLetter } from '@/lib/utils';
import { BackButton } from '@/components/ui/back-button';
import { SubmitButton } from '@/components/ui/submit-button';

export type ShowTestProps = {
  id: string;
}

export const ShowTest: React.FC<ShowTestProps> = ({ id }: ShowTestProps) => {
  const { test, isLoading, error } = useShowTest(id);
  const { questionsOptions, isLoading: isLoadingOptions, error: errorOptions } = useShowQuestionsOptions(test?.id);
  const { handleSubmit, register, errors, onSubmit, answers } = useSaveTest(questionsOptions as QuestionOptionsDto[]);

  if (error || errorOptions) {
    return <div>Error: {error || errorOptions}</div>;
  }

  if (!test || isLoading || isLoadingOptions) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full">
      <div className="border-2 border-gray-200 p-3 flex flex-col justify-center">
        <span>Data de criação: {formatDate(new Date(test?.creationDate))}</span>
        <span>Tipo: {test?.type ? capitalizeFirstLetter(test?.type) : 'Não encontrado'}</span>
        <span>Tema: {test.theme.theme}</span>
        <span>Data de execução: {test.userExecutionDate ? formatDate(new Date(test.userExecutionDate)) : 'Não executado'}</span>
      </div>
      {questionsOptions && questionsOptions.length > 0 ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type='hidden' id='themeId' value={test.theme.id} {...register('param_themeId')} />
          <input type='hidden' id='testType' value={test.type} {...register('param_testType')} />
          <input type='hidden' id='testId' value={test.id} {...register('param_testId')} />
          <div className="my-5">
            {questionsOptions.map(questionOption => (
              <div key={questionOption.id} className="font-bold my-2">
                {questionOption.question}
                {questionOption.options.map(option => (
                  <div key={option.id} className="font-normal flex items-center">
                    <span><input
                      type="radio"
                      id={option.id}
                      value={option.id}
                      className="form-radio text-blue-500"
                      checked={answers[questionOption.id] === option.id}
                      readOnly={!!questionOption.userAnswerId}
                      {...register(`${questionOption.id}`, { required: 'This field is required' })}
                    />
                      {option.option}
                    </span>
                    {test.userExecutionDate && answers[questionOption.id] === option.id && (
                      <div>
                        {option.isCorrect ? (
                          <div className="ml-3"><Image src="/correct.svg" alt="Correct" width={15} height={15} /></div>
                        ) : (
                          <div className="ml-3 flex items-center">
                            <div><Image src="/incorrect.svg" alt="Correct" width={15} height={15} /></div>
                            <div className="relative group flex items-center ml-2">
                              <span className="text-blue-500 cursor-pointer font-bold">(i)</span>
                              <div className="absolute left-0 ml-5 mt-[-0.5rem] w-48 p-2 bg-gray-200 text-gray-800 rounded shadow-lg hidden group-hover:block">
                                {option.explanation}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
                {errors[questionOption.id]?.message && (
                  <p className="text-red-500 text-sm">{String(errors[questionOption.id]?.message)}</p>
                )}
              </div>
            ))}
            <div className="my-5 space-x-2">
              {!test.userExecutionDate ? <SubmitButton>Gravar</SubmitButton> : null}
              <BackButton>Voltar</BackButton>
            </div>
          </div>
        </form>
      ) : null}
    </div>
  );
}