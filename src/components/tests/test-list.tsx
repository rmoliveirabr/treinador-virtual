'use client'

import React from 'react';

import { Button } from '@/components/ui/button';
import { BackButton } from '@/components/ui/back-button';

import { useTestList, Test, TestType, Theme } from '@/hooks/tests/use-test-list';
import { formatDate, capitalizeFirstLetter } from '@/lib/utils';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type TestListProps = {
  type: TestType;
  themeId: string;
}

export const TestList: React.FC<TestListProps> = ({ type, themeId }: TestListProps) => {
  const { tests, isLoading, error, handleViewTest, handleCreateAssessment } = useTestList(type, themeId);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {type == 'assessment' && <div className="my-3 flex justify-start">
        <Button className="bg-gray-700" onClick={handleCreateAssessment}>
          Gerar Assessment
        </Button>
      </div>}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">Data de criação</TableHead>
            <TableHead className="">Tipo</TableHead>
            <TableHead className="">Assunto</TableHead>
            <TableHead className="">Data de execução</TableHead>
            <TableHead className="w-50">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tests.map((test: Test) => (
            <TableRow key={test.id}>
              <TableCell className="font-medium">{formatDate(new Date(test.creationDate))}</TableCell>
              <TableCell className="">{test.type ? capitalizeFirstLetter(test.type) : 'Não encontrado'}</TableCell>
              <TableCell className="">{test.theme.theme}</TableCell>
              <TableCell className="">{test.userExecutionDate ? formatDate(new Date(test.userExecutionDate)) : 'Não executado'}</TableCell>
              <TableCell className="flex justify-left space-x-2">
                {!test.userExecutionDate ?
                  <Button onClick={() => handleViewTest(test.id)}>Executar</Button> :
                  <Button onClick={() => handleViewTest(test.id)}>Ver</Button>
                }
              </TableCell>
            </TableRow>
          ))}
          {tests.length === 0 && <TableRow><TableCell colSpan={4}>Nenhum teste encontrado</TableCell></TableRow>}
        </TableBody>
      </Table>
      <div className="my-5 space-x-2">
        <BackButton>Voltar</BackButton>
      </div>
    </div>
  );
}