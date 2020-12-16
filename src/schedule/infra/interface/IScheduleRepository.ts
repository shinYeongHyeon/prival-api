import { Schedule } from '../../domain/Schedule';

export interface IScheduleRepository {
  save(schedule: Schedule): Promise<Schedule>;
}
