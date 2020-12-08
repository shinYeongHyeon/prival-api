import { UseCaseError } from '../core/UseCaseError';
import { Result } from '../core/Result';

export namespace UseCaseErrors {
  export class InvariantViolationError extends UseCaseError {
    constructor(result: Result<any>) {
      super(result.error);
    }
  }
}
