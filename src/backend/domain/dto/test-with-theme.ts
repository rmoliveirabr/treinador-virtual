import { ThemeDto } from '@/backend/domain/dto/theme';

export type TestWithThemeDto = {
  id: string;
  creationDate: Date;
  type: string;
  themeId: string;
  theme?: ThemeDto;
  userExecutionDate?: Date;
}
