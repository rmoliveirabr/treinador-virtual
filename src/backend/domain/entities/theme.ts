import { Entity } from '@/backend/core/entity';

export enum ProficiencyLevel {
  Novice = 1,
  Beginner,
  Intermediate,
  Proficient,
  Advanced,
  Expert,
  Master
}

export type ThemeParams = {
  id?: string;
  theme: string;
  creationDate?: Date;
  userLevel?: ProficiencyLevel;
  isActive: boolean;
}

export class Theme extends Entity {
  theme: string;
  creationDate: Date;
  userLevel: ProficiencyLevel;
  isActive: boolean;

  constructor({ id = undefined, theme, creationDate = new Date(), userLevel = 2, isActive = true }: ThemeParams) {
    super(id);
    this.theme = theme;
    this.creationDate = creationDate;
    this.userLevel = userLevel;
    this.isActive = isActive;
  }
}