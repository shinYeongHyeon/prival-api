import { isNil } from 'lodash';

export interface ValueObjectProps {
  [key: string]: any;
}

export abstract class ValueObject<T extends ValueObjectProps> {
  public props: T;

  constructor(props: T) {
    this.props = {
      ...props,
    };
  }

  isEqual(valueObject: ValueObject<T>): boolean {
    if (isNil(valueObject)) {
      return false;
    }

    return JSON.stringify(this.props) === JSON.stringify(valueObject.props);
  }
}
