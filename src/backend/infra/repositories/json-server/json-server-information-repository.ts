import { Information } from '@/backend/domain/entities/information';
import { InformationWithTestAndThemeDto } from '@/backend/domain/dto/information-with-test-theme';

import { InformationRepository } from '@/backend/domain/repositories/information-repository';

export class JsonServerInformationRepository extends InformationRepository {
  private url = `${process.env.JSONAPI_URL}/informations`;

  async getAll(): Promise<InformationWithTestAndThemeDto[]> {
    return await fetch(`${this.url}?_expand=test&_expand=theme&_sort=generationDate&_order=desc`).then(response => response.json());
  }

  async findById(id: string): Promise<Information | undefined> {
    return await fetch(`${this.url}/${id}`).then(response => response.json());
  }

  async findByTheme(themeId: string): Promise<InformationWithTestAndThemeDto[]> {
    return await fetch(`${this.url}?_expand=test&_expand=theme&_sort=generationDate&_order=desc&themeId=${themeId}`).then(response => response.json());
  }

  async update(information: Information): Promise<Information> {
    return await fetch(`${this.url}/${information.id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      'body': JSON.stringify(information),
    }).then(response => response.json());
  }

  async create(information: Information): Promise<Information> {
    if (!information.testId) information.testId = '';
    let informationString = JSON.stringify(information);

    const response = await fetch(this.url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      'body': JSON.stringify(information),
    }).then(response => response.json());

    return response;
  }
}