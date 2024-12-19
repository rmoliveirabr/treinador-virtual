import { TestRepository } from '@/backend/domain/repositories/test-respository';

import { GeneratedTest } from '@/backend/domain/services/content-generator';

import { Test, TestType } from '@/backend/domain/entities/test';
import { Theme } from '@/backend/domain/entities/theme';
import { Question } from '@/backend/domain/entities/question';
import { Option } from '@/backend/domain/entities/option';

import { ContentGenerator } from '@/backend/domain/services/content-generator';
import { ThemeRepository } from '@/backend/domain/repositories/theme-repository';
import { QuestionOptionsDto } from '@/backend/domain/dto/question-options';
import { TestWithThemeDto } from '@/backend/domain/dto/test-with-theme';

export class TestUseCases {
  constructor(private testRepository: TestRepository,
    private themeRepository: ThemeRepository,
    private contentGenerator: ContentGenerator,
  ) { }

  async getAll(): Promise<Test[]> {
    return await this.testRepository.getAll();
  }

  async findById(id: string): Promise<TestWithThemeDto | undefined> {
    return await this.testRepository.findById(id);
  }

  async findByTypeAndTheme(type: TestType, themeId?: string): Promise<TestWithThemeDto[]> {
    return await this.testRepository.findByTypeAndTheme(type, themeId);
  }

  async update(test: Test): Promise<Test> {
    return await this.testRepository.update(test);
  }

  async getQuestionsOptionsByTestId(testId: string): Promise<QuestionOptionsDto[]> {
    return await this.testRepository.getQuestionsOptionsByTestId(testId);
  }

  async saveAnswerToQuestion(questionId: string, optionId: string): Promise<Question> {
    const question = await this.testRepository.getQuestion(questionId);
    if (!question) {
      throw new Error(`Question with id ${questionId} not found`);
    }

    question.userAnswerId = optionId;
    return await this.testRepository.updateQuestion(question);
  }

  async isOptionCorrect(optionId: string): Promise<boolean> {
    const option = await this.testRepository.getOption(optionId);
    if (!option) {
      throw new Error(`Option with id ${optionId} not found`);
    }

    return option.isCorrect;
  }

  async adjustLevel(themeId: string, testId: string): Promise<{ oldLevel: number, newLevel: number }> {
    // create assessmentResults based on testId
    const questionOptions = await this.testRepository.getQuestionsOptionsByTestId(testId);

    // TODO: maybe move converting to string to content generator
    let assessmentResults = '';
    questionOptions.forEach(question => {
      assessmentResults += `Question ${question.order}: ${question.question}\n`;
      let answeredOptionText = '';
      question.options.forEach(option => {
        if (question.userAnswerId === option.id) {
          answeredOptionText = option.option;
        }
        assessmentResults += `Option ${option.order}: ${option.option} - isCorrect: ${option.isCorrect}\n`;
      });
      assessmentResults += `Answered option ${answeredOptionText}\n`;
    });

    // get current level for a theme based on themeId
    const theme = await this.themeRepository.findById(themeId);
    if (!theme) {
      throw new Error(`Theme with id ${themeId} not found`);
    }
    const oldLevel = theme.userLevel;

    // calculate new level and save it
    const newLevel = await this.contentGenerator.calculateLevel(assessmentResults, oldLevel);
    theme.userLevel = newLevel;

    await this.themeRepository.update(theme);

    return { oldLevel, newLevel };
  }

  private async createTest(generatedTest: GeneratedTest, type: TestType, theme: Theme): Promise<Test> {
    /*
      create new test, questions and options
    */
    // create new test
    const newTest = new Test({
      themeId: theme.id,
      type: type,
      userExecutionDate: undefined,
      creationDate: new Date()
    });

    const createdTest = await this.testRepository.createTest(newTest);

    // create new questions and options
    let questionOrder = 1;
    for (let question of generatedTest.questions) {
      // create new question
      const newQuestion = new Question({
        question: question.questionText,
        order: questionOrder++,
        testId: createdTest.id
      });

      const createdQuestion = await this.testRepository.createQuestion(newQuestion);

      // create new options
      let optionOrder = 1;
      for (let option of question.options) {
        const newOption = new Option({
          option: option.optionText,
          order: optionOrder++,
          explanation: option.explanation,
          isCorrect: option.isCorrect,
          questionId: createdQuestion.id
        });

        const createdOption = await this.testRepository.createOption(newOption);
      }
    }

    return createdTest;
  }

  async create(type: TestType, theme: Theme): Promise<Test> {
    /* Use data from the Theme and question history to generate a new Test */

    // get all executed tests for context (as a list of question texts)
    const executedTests = await this.testRepository.findExecutedTests();
    const questionHistoryPromises = executedTests.map(test => this.testRepository.findQuestionsByTestId(test.id));
    const questionHistoryNotFlattened = await Promise.all(questionHistoryPromises);
    const questionHistory = questionHistoryNotFlattened.flat();
    const questionHistoryText = questionHistory.map(question => question.question);

    // generate new test
    const generatedTest: GeneratedTest = await this.contentGenerator.generateTest(theme.theme, questionHistoryText);

    const createdTest = await this.createTest(generatedTest, type, theme);
    return createdTest;
  }
}