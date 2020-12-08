import { ValueObject, ValueObjectProps } from './ValueObject';

class MockValueObject extends ValueObject<any> {}

describe('ValueObject', () => {
  const valueObjectProps = {
    test: 1,
  };

  let mockValueObject: ValueObject<ValueObjectProps>;

  beforeAll(() => {
    mockValueObject = new MockValueObject(valueObjectProps);
  });

  it('생성되는지', () => {
    expect(mockValueObject).toBeDefined();
  });

  it('같은 ValueObject 를 보낼 경우 True 를 리턴하는지', () => {
    expect(mockValueObject.isEqual(mockValueObject)).toBeTruthy();
  });

  it('다른 ValueObject 를 보낼 경우 False 를 리턴하는지', () => {
    expect(
      mockValueObject.isEqual(
        new MockValueObject({
          test: 2,
        }),
      ),
    ).toBeFalsy();
  });

  it('ValueObject 가 null 혹은 Undefined 인 경우 False 를 리턴하는지', () => {
    expect(mockValueObject.isEqual(null)).toBeFalsy();
    expect(mockValueObject.isEqual(undefined)).toBeFalsy();
  });

  it('ValueObject 의 props 가 null 혹은 Undefined 인 경우 False 를 리턴하는지', () => {
    expect(mockValueObject.isEqual(new MockValueObject(null))).toBeFalsy();
    expect(mockValueObject.isEqual(new MockValueObject(undefined))).toBeFalsy();
  });
});
