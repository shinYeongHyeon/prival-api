import { UseCaseErrors } from './UseCaseErrors';
import { Result } from '../core/Result';
import InvariantViolationError = UseCaseErrors.InvariantViolationError;

describe('UseCaseError', () => {
  let useCaseErrors: UseCaseErrors.InvariantViolationError;
  let resultFail: Result<any>;

  beforeAll(() => {
    resultFail = Result.fail('TEST');
    useCaseErrors = new UseCaseErrors.InvariantViolationError(resultFail);
  });

  it('생성되었는지', () => {
    expect(useCaseErrors).toBeDefined();
  });

  it('InvariantViolationError 를 리턴하는지', () => {
    expect(useCaseErrors).toEqual(new InvariantViolationError(resultFail));
  });
});
