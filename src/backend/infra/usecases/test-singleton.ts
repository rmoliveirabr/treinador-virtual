import { TestUseCases } from '@/backend/domain/usecases/test-usecases';
import { FakeContentGenerator } from '@/backend/infra/services/fake-content-generator';
import { JsonServerTestRepository } from '@/backend/infra/repositories/json-server/json-server-test-repository';
import { JsonServerThemeRepository } from '@/backend/infra/repositories/json-server/json-server-theme-repository';

export class TestSingleton {
  private static instance: TestSingleton;

  public testUseCases: TestUseCases;
  private testRepository: JsonServerTestRepository;
  private themeRepository: JsonServerThemeRepository;
  private contentGenerator: FakeContentGenerator;

  private constructor() {
    this.testRepository = new JsonServerTestRepository();
    this.themeRepository = new JsonServerThemeRepository();
    this.contentGenerator = new FakeContentGenerator();
    this.testUseCases = new TestUseCases(this.testRepository, this.themeRepository, this.contentGenerator);
  }

  public static getInstance(): TestSingleton {
    if (!TestSingleton.instance) {
      TestSingleton.instance = new TestSingleton();
    }

    return TestSingleton.instance;
  }
}