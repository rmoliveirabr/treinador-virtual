import { TestSingleton } from '@/backend/infra/usecases/test-singleton';

export default async function handler(req: any, res: any) {
  const { id } = req.query;
  const test = await TestSingleton.getInstance().testUseCases.findById(id);
  res.status(200).json(test);
}