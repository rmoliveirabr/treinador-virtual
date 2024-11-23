import { ThemeDto } from '@/backend/domain/dto/theme';

export type TestDto = {
  id: string;
  creationDate: Date;
  type: string;
  theme?: ThemeDto;
  userExecutionDate?: Date;
}