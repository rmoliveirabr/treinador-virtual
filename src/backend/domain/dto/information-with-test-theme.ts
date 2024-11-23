import { ThemeDto } from '@/backend/domain/dto/theme';
import { TestDto } from '@/backend/domain/dto/test';

export type InformationWithTestAndThemeDto = {
  id: string;
  information: string;
  generationDate: Date;
  themeId: string;
  theme: ThemeDto;
  test: TestDto;
}
