import { Entity } from '@/backend/core/entity';

export type TestType = 'quiz' | 'assessment';

export type TestParams = {
  id?: string;
  creationDate: Date;
  userExecutionDate?: Date;
  type?: TestType;
  themeId: string;
  // informationId?: string;
}

export class Test extends Entity {
  creationDate: Date;
  userExecutionDate?: Date;
  type: TestType;
  themeId: string;
  // informationId?: string;

  constructor({ id = undefined, creationDate = new Date(), userExecutionDate = undefined, type = 'assessment', themeId }: TestParams) {
    super(id);
    this.creationDate = creationDate;
    this.userExecutionDate = userExecutionDate;
    this.type = type;
    this.themeId = themeId;
    // this.informationId = informationId;
  }
}