import { Result } from './Result';

describe('Result', () => {
  const VALUE_OK = 'OK';
  const ERROR_MESSAGE = 'ERROR_TEST';

  let result: Result<any>;

  it('생성되었는지', () => {
    result = new Result(true);

    expect(result).toBeDefined();
  });

  it('isSuccess 가 True 이면서 error 도 있는 경우의 예외케이스 확인', () => {
    try {
      result = new Result(true, new Error());

      expect(true).toBeFalsy();
    } catch (error) {
      expect(error.message).toEqual(
        'InvalidOperation : A result can`t be successful and contain an error.',
      );
    }
  });

  it('isSuccess 가 False 이면서 error 도 없는 경우의 예외케이스 확인', () => {
    try {
      result = new Result(false);

      expect(true).toBeFalsy();
    } catch (error) {
      expect(error.message).toEqual(
        'InvalidOperation : A failing result needs to contain an error message.',
      );
    }
  });

  it('Result 가 생성된 후에는 isSuccess(isFailure, error) 가 변할 수 없는 지', () => {
    try {
      result = new Result(true, undefined, VALUE_OK);

      result.isSuccess = false;
    } catch (error) {
      expect(error.message).toEqual(
        "Cannot assign to read only property 'isSuccess' of object '#<Result>'",
      );
    }
  });

  it('value get 메소드가 잘 작동하는지', () => {
    result = new Result(true, undefined, VALUE_OK);

    expect(result.value).toEqual(VALUE_OK);
  });

  it('value get 메소드는 isSuccess 가 True 인 경우에만 가능한지', () => {
    try {
      result = new Result(
        false,
        new Error(ERROR_MESSAGE),
        new Error(ERROR_MESSAGE),
      );
      result.value;

      expect(true).toBeFalsy();
    } catch (error) {
      expect(error.message).toEqual(
        'Can`t get the value of an error result. Use `errorValue` instead.',
      );
    }
  });

  it('errorValue 메소드가 잘 작동하는지', () => {
    result = new Result(false, new Error(ERROR_MESSAGE));

    expect(result.errorValue().message).toEqual(ERROR_MESSAGE);
  });

  it('errorValue 메소드는 isSuccess 가 False 인 경우에만 가능한지', () => {
    try {
      result = new Result(true);
      result.errorValue();

      expect(true).toBeFalsy();
    } catch (error) {
      expect(error.message).toEqual(
        'Can`t execute errorValue of an success result. Use `value` instead.',
      );
    }
  });

  it('ok 메소드의 정상작동확인', () => {
    const resultOk = Result.ok(VALUE_OK);

    expect(resultOk.value).toEqual(VALUE_OK);
  });

  it('fail 메소드의 정상작동확인', () => {
    const resultOk = Result.fail(VALUE_OK);

    expect(resultOk.errorValue()).toEqual(VALUE_OK);
  });

  it('successResult 여러개가 들어온 경우에 combine 메소드는 Result.ok() 를 리턴하는지', () => {
    const results = [
      new Result(true, undefined, VALUE_OK),
      new Result(true, undefined, 'VALUE_OK_2'),
    ];
    const combinedResult = Result.combine(results);

    expect(combinedResult.isSuccess).toBeTruthy();
  });

  it('여러 Result 중 Fail 이 하나라도 껴있는 경우에 combine 메소드는 해당 실패 Result 를 리턴하는지', () => {
    const successResult1 = new Result(true, undefined, VALUE_OK);
    const successResult2 = new Result(true, undefined, 'VALUE_OK_2');
    const failResult = new Result(false, ERROR_MESSAGE);
    const results = [successResult1, failResult, successResult2];
    const combinedResult = Result.combine(results);

    expect(combinedResult.errorValue()).toEqual(ERROR_MESSAGE);
  });
});
