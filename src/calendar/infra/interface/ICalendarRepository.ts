import { Calendar } from '../../domain/Calendar';

export interface ICalendarRepository {
  saveDefault(calendar: Calendar): Promise<Calendar>;
}
