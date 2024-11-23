import { ThemeSingleton } from '@/backend/infra/usecases/theme-singleton';
import { Theme } from '@/backend/domain/entities/theme';

// @ts-ignore
export default async function handler(req: any, res: any) {
  const { theme } = JSON.parse(req.body);
  const newTheme = new Theme({ theme, isActive: true });
  const createdTheme = await ThemeSingleton.getInstance().themeUseCases.create(newTheme);
  res.status(200).json(createdTheme);
}