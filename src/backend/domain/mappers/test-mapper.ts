import { Test } from '@/backend/domain/entities/test';
import { TestWithThemeDto } from '@/backend/domain/dto/test-with-theme';

export class TestMapper {
  static fromDtoToEntity(testWithThemeDto: TestWithThemeDto): Test {
    // type guard the 'type' property
    if (testWithThemeDto.type !== 'quiz' && testWithThemeDto.type !== 'assessment') {
      throw new Error(`Invalid test type: ${testWithThemeDto.type}`);
    }

    return new Test({
      id: testWithThemeDto.id,
      creationDate: testWithThemeDto.creationDate,
      type: testWithThemeDto.type,
      themeId: testWithThemeDto.themeId,
      userExecutionDate: testWithThemeDto.userExecutionDate,
    });
  }
}