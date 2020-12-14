import { UserRole } from '../../../entity/UsersCalendar.entity';

export class JoinCalendarRequestDto {
  userId: string;
  calendarId: string;
  userRole: UserRole;
}

export class JoinCalendarResponseDto {
  ok: boolean;
  error?: string;
}
