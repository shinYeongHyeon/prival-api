import { IDomainEvent } from './event/IDomainEvent';
import { UniqueEntityId } from './UniqueEntityId';
import { AggregateRoot } from './AggregateRoot';

class MockAggregateRoot extends AggregateRoot<any> {
  mockAddDomainEvent(domainEvent: IDomainEvent) {
    this.addDomainEvent(domainEvent);
  }
}

class MockDomainEvent implements IDomainEvent {
  dateTimeOccurred: Date;
}

describe('AggregateRoot AND IDomainEvent', () => {
  const aggregateProps = {
    test: 1,
  };
  const testUniqueEntityId = new UniqueEntityId('TEST_ID');

  let mockAggregateRoot: MockAggregateRoot;

  beforeEach(() => {
    mockAggregateRoot = new MockAggregateRoot(
      aggregateProps,
      testUniqueEntityId,
    );
  });

  describe('AggregateRoot', () => {
    it('생성되었는지', () => {
      expect(mockAggregateRoot).toBeDefined();
      expect(mockAggregateRoot.domainEvents).toEqual([]);
    });

    it('Entity 의 id 를 잘 가져오는지', () => {
      expect(mockAggregateRoot.id).toEqual(testUniqueEntityId);
    });
  });

  describe('IDomainEvent', () => {
    it('DomainEvent 의 추가가 잘 이루어지는지', () => {
      mockAggregateRoot.mockAddDomainEvent(new MockDomainEvent());

      expect(mockAggregateRoot.domainEvents).toHaveLength(1);
    });

    it('DomainEvent 의 초기화가 잘 이루어지는지', () => {
      mockAggregateRoot.mockAddDomainEvent(new MockDomainEvent());
      mockAggregateRoot.clearEvents();

      expect(mockAggregateRoot.domainEvents).toHaveLength(0);
      expect(mockAggregateRoot.domainEvents).toEqual([]);
    });
  });
});
