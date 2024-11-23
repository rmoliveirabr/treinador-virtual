import { ContentGenerator } from '@/backend/domain/services/content-generator';
import { GeneratedTest } from '@/backend/domain/services/content-generator';

export class FakeContentGenerator implements ContentGenerator {
  async generateInformation(themeText: string, infoHistory: string[]): Promise<string> {
    return `This is a fake information generated on ${new Date().toLocaleString()} for the ${themeText} theme with the following history: ${infoHistory.join(', ')}`;
  }

  async calculateLevel(assessmentResults: string, currentLevel: number): Promise<number> {
    if (currentLevel < 7) return currentLevel + 1;
    else return currentLevel;
  }

  async generateTest(themeText: string, questionHistory: string[]): Promise<GeneratedTest> {
    return {
      theme: themeText,
      questions: [
        {
          questionText: 'Pergunta 1',
          options: [
            {
              optionText: 'Resposta 1.1',
              explanation: 'Explicação 1',
              isCorrect: true
            },
            {
              optionText: 'Resposta 1.2',
              explanation: 'Explicação 2',
              isCorrect: false
            }
          ]
        },
        {
          questionText: 'Pergunta 2',
          options: [
            {
              optionText: 'Resposta 2.1',
              explanation: 'Explicação 3',
              isCorrect: true,
            },
            {
              optionText: 'Resposta 2.2',
              explanation: 'Explicação 4',
              isCorrect: false,
            },
          ]
        }
      ]
    }
  }
}