import { Entity } from '@/backend/core/entity';

export type InformationParams = {
  id?: string;
  information: string;
  generationDate?: Date;
  themeId: string;
  testId?: string;
}

export class Information extends Entity {
  information: string;
  generationDate: Date;
  themeId: string;
  testId?: string;

  constructor({ id = undefined, information, themeId, generationDate = new Date(), testId = undefined }: InformationParams) {
    super(id);
    this.information = information;
    this.themeId = themeId;
    this.generationDate = generationDate;
    this.testId = testId;
  }
}