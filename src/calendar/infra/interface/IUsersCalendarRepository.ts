import { UsersCalendar } from '../../domain/UsersCalendar';

export interface IUsersCalendarRepository {
  save(usersCalendar: UsersCalendar): Promise<UsersCalendar>;

  findDefaultByUserId(userId: string): Promise<UsersCalendar>;
}
