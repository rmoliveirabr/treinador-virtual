export type QuestionOptionsDto = {
  id: string;
  question: string;
  order: number;
  userAnswerId: string;
  options: {
    id: string;
    option: string;
    order: number;
    explanation: string;
    isCorrect: boolean;
  }[];
};

export type AnswersDto = {
  [key: string]: string;
}