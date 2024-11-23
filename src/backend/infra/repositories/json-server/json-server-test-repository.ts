import { QuestionOptionsDto } from '@/backend/domain/dto/question-options';
import { Option } from '@/backend/domain/entities/option';
import { Question } from '@/backend/domain/entities/question';
import { Test, TestType } from '@/backend/domain/entities/test';
import { TestWithThemeDto } from '@/backend/domain/dto/test-with-theme';
import { TestRepository } from '@/backend/domain/repositories/test-respository'

export class JsonServerTestRepository extends TestRepository {
  private testsUrl = `${process.env.JSONAPI_URL}/tests`;
  private questionsUrl = `${process.env.JSONAPI_URL}/questions`;
  private optionsUrl = `${process.env.JSONAPI_URL}/options`;

  async getAll(): Promise<Test[]> {
    return await fetch(`${this.testsUrl}?_sort=creationDate&_order=desc`).then(response => response.json());
  }

  async findById(id: string): Promise<TestWithThemeDto | undefined> {
    return await fetch(`${this.testsUrl}/${id}?_expand=theme`).then(response => response.json());
  }

  async findByTypeAndTheme(type: TestType, themeId?: string): Promise<TestWithThemeDto[]> {
    let url = `${this.testsUrl}?type=${type}`;
    if (themeId) {
      url += `&themeId=${themeId}`;
    }
    url += `&_expand=theme&_sort=creationDate&_order=desc`;

    return await fetch(url).then(response => response.json());
  }

  async update(test: Test): Promise<Test> {
    return await fetch(`${this.testsUrl}/${test.id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      'body': JSON.stringify(test),
    }).then(response => response.json());
  }

  // async getQuizes(): Promise<Test[]> {
  //   return await this.findByTypeAndTheme('quiz');
  // }

  // async getAssessments(): Promise<Test[]> {
  //   return await this.findByTypeAndTheme('assessment');
  // }

  async getQuestionsOptionsByTestId(testId: string): Promise<QuestionOptionsDto[]> {
    return await fetch(`${this.questionsUrl}?testId=${testId}&_sort=order&_embed=options`).then(response => response.json());
  }

  async createTest(test: Test): Promise<Test> {
    return await fetch(this.testsUrl, {
      method: 'POST',
      body: JSON.stringify(test),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json());
  }

  async createQuestion(question: Question): Promise<Question> {
    return await fetch(this.questionsUrl, {
      method: 'POST',
      body: JSON.stringify(question),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json());
  }

  async createOption(option: Option): Promise<Option> {
    return await fetch(this.optionsUrl, {
      method: 'POST',
      body: JSON.stringify(option),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json());
  }

  async findExecutedTests(): Promise<Test[]> {
    // find all tests where userExecutionDate is not null
    const allTests = await this.getAll();
    return allTests.filter(test => test.userExecutionDate !== null);
  }

  async findQuestionsByTestId(testId: string): Promise<Question[]> {
    return await fetch(`${this.questionsUrl}?testId=${testId}`).then(response => response.json());
  }

  async getQuestion(id: string): Promise<Question | undefined> {
    return await fetch(`${this.questionsUrl}/${id}`).then(response => response.json());
  }

  async getOption(id: string): Promise<Option | undefined> {
    return await fetch(`${this.optionsUrl}/${id}`).then(response => response.json());
  }

  async updateQuestion(question: Question): Promise<Question> {
    return await fetch(`${this.questionsUrl}/${question.id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      'body': JSON.stringify(question),
    }).then(response => response.json());
  }
}