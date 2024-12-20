import { randomUUID } from 'node:crypto';

export abstract class Entity {
  id: string;

  constructor(id?: string) {
    this.id = id ?? randomUUID();
  }
}