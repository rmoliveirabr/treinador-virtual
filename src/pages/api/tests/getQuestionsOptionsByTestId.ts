import { TestSingleton } from '@/backend/infra/usecases/test-singleton';

export default async function handler(req: any, res: any) {
  const { testId } = req.query;
  const questionsOptions = await TestSingleton.getInstance().testUseCases.getQuestionsOptionsByTestId(testId);
  res.status(200).json(questionsOptions);
}