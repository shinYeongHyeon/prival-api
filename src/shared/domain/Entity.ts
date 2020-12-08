import { isNil } from 'lodash';

import { UniqueEntityId } from './UniqueEntityId';

export abstract class Entity<T> {
  public readonly props: T;
  protected readonly _id: UniqueEntityId;

  constructor(props: T, id?: UniqueEntityId) {
    this._id = id ? id : new UniqueEntityId();
    this.props = props;
  }

  isEqual(entity?: Entity<T>): boolean {
    if (isNil(entity)) {
      return false;
    }

    return this._id.isEqual(entity._id);
  }
}
