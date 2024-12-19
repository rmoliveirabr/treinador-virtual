import { InformationRepository } from '@/backend/domain/repositories/information-repository';
import { Information } from '@/backend/domain/entities/information';
import { Theme } from '@/backend/domain/entities/theme';

import { ContentGenerator } from '@/backend/domain/services/content-generator';
import { InformationWithTestAndThemeDto } from '@/backend/domain/dto/information-with-test-theme';

export class InformationUseCases {
  constructor(private informationRepository: InformationRepository,
    private contentGeneratorService: ContentGenerator
  ) { }

  async getAll(): Promise<InformationWithTestAndThemeDto[]> {
    return await this.informationRepository.getAll();
  }

  async findById(id: string): Promise<Information | undefined> {
    return await this.informationRepository.findById(id);
  }

  async findByTheme(themeId: string): Promise<InformationWithTestAndThemeDto[]> {
    return await this.informationRepository.findByTheme(themeId);
  }

  async update(information: Information): Promise<Information> {
    return await this.informationRepository.update(information);
  }

  async create(theme: Theme, history: Information[]): Promise<Information> {
    /* Use data from the Theme  and informaton history to generate a new Information */
    const historyText = history.map((info: Information) => info.information);
    const newInformationText = await this.contentGeneratorService.generateInformation(theme.theme, historyText);

    const newInformation = new Information({ information: newInformationText, themeId: theme.id });

    return await this.informationRepository.create(newInformation);
  }
}