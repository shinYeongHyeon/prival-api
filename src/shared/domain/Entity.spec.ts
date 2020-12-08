import { Entity } from './Entity';

class MockEntity extends Entity<any> {}

describe('Entity', () => {
  const mockEntityProps = {
    test: 1,
  };

  let mockEntity: MockEntity;

  beforeAll(() => {
    mockEntity = new MockEntity(mockEntityProps);
  });

  it('생성되는지', () => {
    expect(mockEntity).toBeDefined();
  });

  it('같은 Entity 를 넘겼을 경우 True 를 리턴하는지', () =>{
    expect(mockEntity.isEqual(mockEntity)).toBeTruthy();
  });

  it('Entity 에 null 혹은 undefined 를 넘겼을 경우 False 를 리턴하는지', () =>{
    expect(mockEntity.isEqual(null)).toBeFalsy();
    expect(mockEntity.isEqual(undefined)).toBeFalsy();
  });

  it('Entity 에 다른 Entity 를 넘겼을 경우 False 를 리턴하는지', () =>{
    expect(mockEntity.isEqual(new MockEntity(mockEntityProps))).toBeFalsy();
  });
});
