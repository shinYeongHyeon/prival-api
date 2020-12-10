import { Result } from '../../shared/core/Result';
import { AggregateRoot } from '../../shared/domain/AggregateRoot';
import { UniqueEntityId } from '../../shared/domain/UniqueEntityId';
import { UserName } from './UserName';
import { UserEmail } from './UserEmail';

interface UserProps {
  userName: UserName;
  userEmail: UserEmail;
  createdAt: Date;
}

export interface UserNewProps {
  userName: UserName;
  userEmail: UserEmail;
}

export class User extends AggregateRoot<UserProps> {
  static create(props: UserProps, id?: UniqueEntityId): Result<User> {
    return Result.ok(new User(props, id));
  }

  static createNew(props: UserNewProps): Result<User> {
    return User.create({ ...props, createdAt: new Date() });
  }

  private constructor(props: UserProps, id?: UniqueEntityId) {
    super(props, id);
  }

  get name(): UserName {
    return this.props.userName;
  }

  get email(): UserEmail {
    return this.props.userEmail;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }
}
