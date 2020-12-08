export class Result<T> {
  public isSuccess: boolean;
  public isFailure: boolean;
  public error?: T | string;

  private readonly _value?: T;

  constructor(isSuccess: boolean = false, error?: T | string, value?: T) {
    if (isSuccess && error) {
      throw new Error(
        'InvalidOperation : A result can`t be successful and contain an error.',
      );
    }

    if (!isSuccess && !error) {
      throw new Error(
        'InvalidOperation : A failing result needs to contain an error message.',
      );
    }

    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this.error = error;
    this._value = value;

    Object.freeze(this);
  }

  get value(): T {
    if (this.isFailure) {
      throw new Error(
        'Can`t get the value of an error result. Use `errorValue` instead.',
      );
    }

    return this._value;
  }

  errorValue(): T {
    if (this.isSuccess) {
      throw new Error(
        'Can`t execute errorValue of an success result. Use `value` instead.',
      );
    }

    return this.error as T;
  }

  public static ok<U>(value?: U): Result<U> {
    return new Result<U>(true, undefined, value);
  }

  public static fail<U>(error: string): Result<U> {
    return new Result<U>(false, error);
  }

  public static combine(results: Result<any>[]): Result<any> {
    for (const result of results) {
      if (result.isFailure) {
        return result;
      }
    }

    return Result.ok();
  }
}
