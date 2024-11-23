export type GeneratedTest = {
  theme: string;
  questions: {
    questionText: string;
    options: {
      optionText: string;
      explanation: string;
      isCorrect: boolean;
    }[]
  }[]
}

export interface ContentGenerator {
  generateInformation(themeText: string, infoHistory: string[]): Promise<string>;
  generateTest(themeText: string, questionHistory: string[]): Promise<GeneratedTest>;
  calculateLevel(assessmentResults: string, currentLevel: number): Promise<number>;
}