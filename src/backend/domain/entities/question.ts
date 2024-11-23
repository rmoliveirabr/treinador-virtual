import { Entity } from '@/backend/core/entity';

export type QuestionParams = {
  id?: string;
  question: string;
  order: number;
  userAnswerId?: string;
  testId: string;
}

export class Question extends Entity {
  question: string;
  order: number;
  userAnswerId?: string;
  testId: string;

  constructor({ id = undefined, question, order, userAnswerId = undefined, testId }: QuestionParams) {
    super(id);
    this.question = question;
    this.order = order;
    this.userAnswerId = userAnswerId;
    this.testId = testId;
  }
}