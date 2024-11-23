'use client'

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { showToast } from '@/components/ui/toast';

export type TestType = 'quiz' | 'assessment';

export type Theme = {
  id: string;
  theme: string;
}

export type Test = {
  id: string;
  creationDate: Date;
  userExecutionDate?: Date;
  type?: TestType;
  theme: Theme;
  informationId?: string;
}

export const useTestList = (type: TestType, themeId: string) => {
  const router = useRouter()
  // const { replace } = useRouter();
  // const searchParams = useSearchParams();
  // const pathname = usePathname();
  // let params = new URLSearchParams(searchParams || '');

  const [tests, setTests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [refresh, setRefresh] = useState<boolean>(true);
  // const [themeList, setThemeList] = useState<Theme[]>([]);
  // const [themeId, setThemeId] = useState<string>('');

  const path = (type == 'assessment' ? 'assessments' : 'quizzes');

  const handleViewTest = (id: string) => {
    router.push(`/${path}/${id}`);
  }

  // const handleChangeTheme = (themeIdParam: string) => {
  //   // update the url
  //   if (themeIdParam && themeIdParam !== 'ALL') {
  //     params.set('themeId', themeIdParam);
  //   } else {
  //     params.delete('themeId');
  //   }
  //   replace(`${pathname}?${params.toString()}`);

  //   // update the list based on themeId
  //   setThemeId(themeIdParam);
  // }

  // get the tests and update themeId
  useEffect(() => {
    const fetchTests = async () => {
      try {
        // update themeId from url
        // const params = new URLSearchParams(searchParams || '');
        // const themeId = params.get('themeId') || '';
        // setThemeId(themeId);

        // set the url
        // let url = `/api/tests/getTests?type=${type}`;
        // if (themeId && themeId !== 'ALL') {
        //   url += `&themeId=${themeId}`;
        // }

        // get the tests
        const data = await fetch(`/api/tests/getTests?type=${type}&themeId=${themeId}`).then(response => response.json());
        if (!data) {
          console.log('tests not found');
          setError('Tests not found');
          return;
        }
        setTests(data);
      } catch (error) {
        console.log('error', error);
        if (error instanceof Error) setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    if (refresh) {
      fetchTests();
      setRefresh(false);
    } else setIsLoading(false);
  }, [type, themeId, refresh]);

  // get the themes
  // useEffect(() => {
  //   const fetchThemes = async () => {
  //     try {
  //       const data = await fetch('/api/themes/getThemes').then(response => response.json());
  //       if (!data) {
  //         setError('Themes not found');
  //         return;
  //       }
  //       setThemeList(data);
  //     } catch (error) {
  //       if (error instanceof Error) setError(error.message);
  //     }
  //   }
  //   fetchThemes();
  // }, []);

  const handleCreateAssessment = () => {
    const test = fetch(`/api/tests/createTest?themeId=${themeId}&type=assessment`)
      .then(response => response.json())
      .then(test => {
        setRefresh(true);
        // return test;
      })
      .catch(err => {
        console.error('Error creating test', err);
      });

    const toastMessage = `Assessment criado com sucesso!!`;
    showToast({
      message: toastMessage,
      type: 'success',
      button: {
        text: 'Ok',
        onClick: () => { }
      },
    });

  }

  return { tests, isLoading, error, handleViewTest, handleCreateAssessment };
}