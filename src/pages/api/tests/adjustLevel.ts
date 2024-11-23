import { TestSingleton } from "@/backend/infra/usecases/test-singleton";

export default async function handler(req: any, res: any) {
  const { themeId, testId } = req.query;

  const { oldLevel, newLevel } = await TestSingleton.getInstance().testUseCases.adjustLevel(themeId, testId);
  return res.status(200).json({ oldLevel, newLevel });
}
