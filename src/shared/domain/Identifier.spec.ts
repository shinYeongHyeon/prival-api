import { Identifier } from './Identifier';

describe('Identifier', () => {
  const UNIQUE_KEY = 'unique';

  let identifier: Identifier<string>;

  beforeAll(() => {
    identifier = new Identifier(UNIQUE_KEY);
  });

  it('생성되는지', () => {
    expect(identifier).toBeDefined();
  });

  it('비교 아이디가 동일할 때, True 를 리턴하는지', () => {
    expect(identifier.isEqual(identifier)).toBeTruthy();
    expect(identifier.isEqual(new Identifier(UNIQUE_KEY))).toBeTruthy();
  });

  it('비교 아이디가 다를 경우, False 를 리턴하는지', () => {
    expect(identifier.isEqual(new Identifier('ANOTHER_KEY'))).toBeFalsy();
  });

  it('비교 아이디가 Null 혹은 Undefined 일 경우, False 를 리턴하는지', () => {
    expect(identifier.isEqual(null)).toBeFalsy();
    expect(identifier.isEqual(undefined)).toBeFalsy();
  });
});
