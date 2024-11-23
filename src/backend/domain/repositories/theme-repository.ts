import { Theme } from '@/backend/domain/entities/theme';

export abstract class ThemeRepository {
  abstract getAll(): Promise<Theme[]>;
  abstract getActive(): Promise<Theme[]>;
  abstract findById(id: string): Promise<Theme | undefined>;
  abstract create(theme: Theme): Promise<Theme>;
  abstract update(theme: Theme): Promise<Theme>;
}