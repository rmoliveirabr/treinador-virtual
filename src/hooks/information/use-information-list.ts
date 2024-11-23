'use client'

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { showToast } from "@/components/ui/toast";

export type Information = {
  id: string;
  information: string;
  generationDate: Date;
  theme: { id: string, theme: string };
  test?: { id: string, creationDate: Date, userExecutionDate?: Date };
}

export const useInformationList = (themeId: string) => {
  const [information, setInformation] = useState<Information[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [refresh, setRefresh] = useState<boolean>(true);

  const router = useRouter()

  const handleViewQuiz = (testId?: string) => {
    router.push(`/quizzes/${testId}`);
  }

  const handleCreateQuiz = (infoId: string) => {
    const test = fetch(`/api/tests/createTest?infoId=${infoId}&type=quiz`)
      .then(response => response.json())
      .then(test => {
        setRefresh(true);
        return test;
      })
      .catch(err => {
        console.error('Error creating test', err);
      });
  }

  const handleCreateInformation = () => {
    const test = fetch(`/api/information/generateInformation?themeId=${themeId}`)
      .then(response => response.text())
      .then(info => {
        setRefresh(true);
        // return info;
      })
      .catch(err => {
        console.error('Error generating information', err);
      });

    const toastMessage = `Informação para treinamento criada com sucesso!!`;
    showToast({
      message: toastMessage,
      type: 'success',
      button: {
        text: 'Ok',
        onClick: () => { }
      },
    });
  }

  useEffect(() => {
    const fetchInformation = async () => {
      try {
        const data = await fetch(`/api/information/getInformation?themeId=${themeId}`).then(response => response.json());
        if (!data) {
          setError('Information not found');
          return;
        }
        setInformation(data);
      } catch (error) {
        if (error instanceof Error) setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    if (refresh) {
      fetchInformation();
      setRefresh(false);
    }
  }, [refresh, themeId]);

  return { information, isLoading, error, handleViewQuiz, handleCreateQuiz, handleCreateInformation };
}