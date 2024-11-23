import { TestSingleton } from '@/backend/infra/usecases/test-singleton';

export default async function handler(req: any, res: any) {
  const { type, themeId } = req.query;
  const tests = await TestSingleton.getInstance().testUseCases.findByTypeAndTheme(type, themeId);
  res.status(200).json(tests);
}