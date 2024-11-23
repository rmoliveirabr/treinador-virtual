import { Theme } from '@/backend/domain/entities/theme';
import { ThemeRepository } from '@/backend/domain/repositories/theme-repository';

export class JsonServerThemeRepository extends ThemeRepository {
  private url = `${process.env.JSONAPI_URL}/themes`;

  async getAll(): Promise<Theme[]> {
    return await fetch(`${this.url}?_sort=creationDate&order=desc`).then(response => response.json());
  }

  async findById(id: string): Promise<Theme | undefined> {
    return await fetch(`${this.url}/${id}`).then(response => response.json());
  }

  async getActive(): Promise<Theme[]> {
    console.log(this.url);
    return await fetch(`${this.url}?isActive=true`).then(response => response.json());
  }

  async create(theme: Theme): Promise<Theme> {
    return await fetch(this.url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      'body': JSON.stringify(theme),
    }).then(response => response.json());
  }

  async update(theme: Theme): Promise<Theme> {
    return await fetch(`${this.url}/${theme.id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      'body': JSON.stringify(theme),
    }).then(response => response.json());
  }
}