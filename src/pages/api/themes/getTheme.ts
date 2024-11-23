import { ThemeSingleton } from '@/backend/infra/usecases/theme-singleton';

export default async function handler(req: any, res: any) {
  const { id } = req.query;
  const test = await ThemeSingleton.getInstance().themeUseCases.findById(id);
  res.status(200).json(test);
}