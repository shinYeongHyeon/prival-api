import { UseCaseError } from './UseCaseError';

class MockUseCaseError extends UseCaseError {}

describe('UseCaseError', () => {
  let useCaseError: MockUseCaseError;

  beforeAll(() => {
    useCaseError = new MockUseCaseError();
  });

  it('생성되었는지', () => {
    expect(useCaseError).toBeDefined();
  });
});
