import { TestMapper } from '@/backend/domain/mappers/test-mapper';
import { TestSingleton } from '@/backend/infra/usecases/test-singleton';

export default async function handler(req: any, res: any) {
  // prepare the data
  const answers = JSON.parse(req.body); // {q3: 'o5', q4: 'o7', q5: 'o9'}
  let answersArray: { questionId: string, optionId: string }[] = [];
  for (let key in answers) {
    const value = answers[key];
    if (!key.startsWith('param_')) {
      answersArray.push({ questionId: key, optionId: value });
    }
  }

  // console.log('answersArray', answersArray);

  let testUpdated = false;

  let testId = '';
  let totalQuestions: number = 0;
  let totalCorrectAnswers: number = 0;

  try {
    for (let answer of answersArray) {
      const { questionId, optionId } = answer;
      const question = await TestSingleton.getInstance().testUseCases.saveAnswerToQuestion(questionId, optionId);
      testId = question.testId;
      totalQuestions++;

      // check if it's correct
      const isCorrect = await TestSingleton.getInstance().testUseCases.isOptionCorrect(optionId);
      totalCorrectAnswers += isCorrect ? 1 : 0;

      if (!testUpdated) {
        testUpdated = true;

        const test = await TestSingleton.getInstance().testUseCases.findById(testId);
        if (!test) {
          throw new Error(`Test with id ${question.testId} not found`);
        }
        test.userExecutionDate = new Date();
        if ('theme' in test) delete test.theme;
        await TestSingleton.getInstance().testUseCases.update(TestMapper.fromDtoToEntity(test));
      }
    }
  } catch (error) {
    res.status(500).json({ message: 'Error saving answers' });
    return;
  }

  console.log('totalQuestions', totalQuestions);
  console.log('totalCorrectAnswers', totalCorrectAnswers);

  res.status(200).json({ totalQuestions, totalCorrectAnswers });
}