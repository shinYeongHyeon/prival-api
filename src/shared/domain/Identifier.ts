import { isNil } from 'lodash';

export class Identifier<T> {
  constructor(private readonly value: T) {
    this.value = value;
  }

  isEqual(id?: Identifier<T>): boolean {
    if (isNil(id)) {
      return false;
    }

    return id.toValue() === this.value;
  }

  toValue(): T {
    return this.value;
  }
}
