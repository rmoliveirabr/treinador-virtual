import { ThemeUseCases } from "@/backend/domain/usecases/theme-usecases";
import { JsonServerThemeRepository } from "@/backend/infra/repositories/json-server/json-server-theme-repository";

export class ThemeSingleton {
  private static instance: ThemeSingleton;

  public themeUseCases: ThemeUseCases;
  private themeRespository: JsonServerThemeRepository

  private constructor() {
    this.themeRespository = new JsonServerThemeRepository();
    this.themeUseCases = new ThemeUseCases(this.themeRespository);
  }

  public static getInstance(): ThemeSingleton {
    if (!ThemeSingleton.instance) {
      ThemeSingleton.instance = new ThemeSingleton();
    }

    return ThemeSingleton.instance;
  }
}