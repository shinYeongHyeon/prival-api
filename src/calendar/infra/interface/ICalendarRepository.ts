import { Calendar } from '../../domain/Calendar';

export interface ICalendarRepository {
  find(calendarId: string): Promise<Calendar>;

  save(calendar: Calendar): Promise<Calendar>;
}
