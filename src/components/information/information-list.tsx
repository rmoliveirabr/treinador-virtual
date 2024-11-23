'use client'

import React from 'react';

import { useInformationList, Information } from '@/hooks/information/use-information-list';
import { formatDate, truncate } from '@/lib/utils';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from '@/components/ui/button';

type Props = {
  themeId: string;
}

export const InformationList: React.FC<Props> = ({ themeId }: Props) => {
  const { information, isLoading, error, handleViewQuiz, handleCreateQuiz, handleCreateInformation } = useInformationList(themeId);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="my-3 flex justify-start">
        <Button className="bg-gray-700" onClick={handleCreateInformation}>
          Gerar Informação
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">Data de geração</TableHead>
            <TableHead className="">Assunto</TableHead>
            <TableHead className="">Resumo</TableHead>
            <TableHead className="">Quiz</TableHead>
            <TableHead className="w-50">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {information.map((info: Information) => (
            <TableRow key={info.id}>
              <TableCell className="font-medium">{formatDate(new Date(info.generationDate))}</TableCell>
              <TableCell className="">{info.theme.theme}</TableCell>
              <TableCell className="">
                <div className="relative group flex items-center ml-2">
                  <span className="cursor-pointer">{truncate(info.information, 50)}</span>
                  {info.information.length > 50
                    ? (<div className="absolute left-0 ml-8 mt-[-0.5rem] w-68 p-2 bg-gray-200 text-gray-800 rounded shadow-lg hidden group-hover:block max-h-64 overflow-y-auto">
                      {info.information}
                    </div>)
                    : null
                  }
                </div>
              </TableCell>
              <TableCell className="">{info.test?.creationDate ? formatDate(new Date(info.test?.creationDate)) : 'Não criado'}</TableCell>
              <TableCell className="flex justify-left space-x-2">
                {info.test?.userExecutionDate
                  ? <Button onClick={() => handleViewQuiz(info.test?.id)}>Ver Quiz</Button>
                  : (info.test?.creationDate
                    ? <Button onClick={() => handleViewQuiz(info.test?.id)}>Fazer Quiz</Button>
                    : <Button onClick={() => handleCreateQuiz(info.id)}>Criar Quiz</Button>
                  )
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}