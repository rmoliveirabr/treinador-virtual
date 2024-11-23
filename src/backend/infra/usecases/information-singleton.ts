import { InformationUseCases } from '@/backend/domain/usecases/information-usecases';
import { FakeContentGenerator } from '@/backend/infra/services/fake-content-generator';
import { JsonServerInformationRepository } from '@/backend/infra/repositories/json-server/json-server-information-repository';

export class InformationSingleton {
  private static instance: InformationSingleton;
  public informationUseCases: InformationUseCases;
  private informationRepository: JsonServerInformationRepository;
  private contentGenerator: FakeContentGenerator;

  private constructor() {
    this.informationRepository = new JsonServerInformationRepository();
    this.contentGenerator = new FakeContentGenerator();
    this.informationUseCases = new InformationUseCases(this.informationRepository, this.contentGenerator);
  }

  public static getInstance(): InformationSingleton {
    if (!InformationSingleton.instance) {
      InformationSingleton.instance = new InformationSingleton();
    }

    return InformationSingleton.instance;
  }
}