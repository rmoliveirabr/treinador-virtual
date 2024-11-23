import { Theme } from '@/backend/domain/entities/theme';
import { ThemeRepository } from '@/backend/domain/repositories/theme-repository';

export class ThemeUseCases {
  constructor(private themeRepository: ThemeRepository) { }

  async getAll(): Promise<Theme[]> {
    return await this.themeRepository.getAll();
  }

  async findById(id: string): Promise<Theme | undefined> {
    return await this.themeRepository.findById(id);
  }

  async getActive(): Promise<Theme[]> {
    return await this.themeRepository.getActive();
  }

  async update(theme: Theme): Promise<Theme> {
    return await this.themeRepository.update(theme);
  }

  async setActive(themeId: string, isActive: boolean): Promise<Theme | undefined> {
    const theme = await this.findById(themeId);
    if (!theme) return undefined;

    theme.isActive = isActive;
    return this.update(theme);
  }

  async create(theme: Theme): Promise<Theme> {
    theme.isActive = true; // activate on creation
    return await this.themeRepository.create(theme);
  }
}