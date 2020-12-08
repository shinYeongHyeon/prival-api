import { UniqueEntityId } from './UniqueEntityId';

describe('UniqueEntityId', () => {
  const UNIQUE_KEY = 'UNIQUE_KEY';

  let uniqueEntityId: UniqueEntityId;

  beforeAll(() => {
    uniqueEntityId = new UniqueEntityId(UNIQUE_KEY);
  });

  it('생성되는지', () => {
    expect(uniqueEntityId).toBeDefined();
  });

  it('상속이 잘 되었는지', () => {
    expect(uniqueEntityId.isEqual(uniqueEntityId)).toBeTruthy();
  });

  it('값이 들어오지 않았을 경우에 자동으로 id를 생성하는지', () => {
    const emptyArgUniqueEntityId = new UniqueEntityId();

    expect(emptyArgUniqueEntityId.toValue()).toBeDefined();
  });
});
