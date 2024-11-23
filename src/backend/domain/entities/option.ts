import { Entity } from '@/backend/core/entity';

export type OptionParams = {
  id?: string;
  option: string;
  order: number;
  explanation: string;
  isCorrect: boolean;
  questionId: string;
}

export class Option extends Entity {
  option: string;
  order: number;
  explanation: string;
  isCorrect: boolean;
  questionId: string;

  constructor({ id = undefined, option, order, explanation, isCorrect, questionId }: OptionParams) {
    super(id);
    this.option = option;
    this.order = order;
    this.explanation = explanation;
    this.isCorrect = isCorrect;
    this.questionId = questionId;
  }
}