import { Entity } from './Entity';
import { IDomainEvent } from './event/IDomainEvent';
import { UniqueEntityId } from './UniqueEntityId';
import { DomainEvent } from './event/DomainEvent';

export abstract class AggregateRoot<T> extends Entity<T> {
  private _domainEvents: IDomainEvent[] = [];

  get id(): UniqueEntityId {
    return this._id;
  }

  get domainEvents(): IDomainEvent[] {
    return this._domainEvents;
  }

  clearEvents(): void {
    this._domainEvents.splice(0, this._domainEvents.length);
  }

  protected addDomainEvent(domainEvent: IDomainEvent): void {
    this._domainEvents.push(domainEvent);

    DomainEvent.markAggregateForDispatch(this);

    this.logDomainEventAdded(domainEvent);
  }

  private logDomainEventAdded(domainEvent: IDomainEvent): void {
    const thisClass = Reflect.getPrototypeOf(this);
    const domainEventClass = Reflect.getPrototypeOf(domainEvent);
    console.info(
      `[Domain Event Created]:`,
      thisClass.constructor.name,
      '==>',
      domainEventClass.constructor.name,
    );
  }
}
