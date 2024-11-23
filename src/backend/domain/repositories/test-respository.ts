import { Test, TestType } from '@/backend/domain/entities/test';
import { Question } from '@/backend/domain/entities/question';
import { Option } from '@/backend/domain/entities/option';

import { QuestionOptionsDto } from '@/backend/domain/dto/question-options';
import { TestWithThemeDto } from '@/backend/domain/dto/test-with-theme';

export abstract class TestRepository {
  abstract getAll(): Promise<Test[]>;
  abstract findById(id: string): Promise<TestWithThemeDto | undefined>;
  abstract findByTypeAndTheme(type: TestType, themeId?: string): Promise<TestWithThemeDto[]>;
  abstract update(test: Test): Promise<Test>;

  // abstract getQuizes(): Promise<Test[]>;
  // abstract getAssessments(): Promise<Test[]>;
  abstract getQuestionsOptionsByTestId(testId: string): Promise<QuestionOptionsDto[]>;

  abstract createTest(test: Test): Promise<Test>;
  abstract createQuestion(question: Question): Promise<Question>;
  abstract createOption(option: Option): Promise<Option>;

  abstract findExecutedTests(): Promise<Test[]>;
  abstract findQuestionsByTestId(testId: string): Promise<Question[]>;

  abstract getQuestion(id: string): Promise<Question | undefined>;
  abstract getOption(id: string): Promise<Option | undefined>;
  abstract updateQuestion(question: Question): Promise<Question>;
}
