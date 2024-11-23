import { Information } from '@/backend/domain/entities/information';
import { InformationWithTestAndThemeDto } from '@/backend/domain/dto/information-with-test-theme';

export abstract class InformationRepository {
  abstract getAll(): Promise<InformationWithTestAndThemeDto[]>;
  abstract findById(id: string): Promise<Information | undefined>;
  abstract findByTheme(themeId: string): Promise<InformationWithTestAndThemeDto[]>;
  abstract create(information: Information): Promise<Information>;
  abstract update(information: Information): Promise<Information>;
}