import { ThemeSingleton } from '@/backend/infra/usecases/theme-singleton';

// @ts-ignore
export default async function handler(req: any, res: any) {
  const themes = await ThemeSingleton.getInstance().themeUseCases.getActive();
  return res.status(200).json(themes)
}