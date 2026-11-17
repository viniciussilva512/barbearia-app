
export type SchedulePeriod = {
  startTime: string;
  endTime: string;
};

export type OccupiedPeriod = {
  startsAt: Date;
  endsAt: Date;
};

export type ScheduleRepositoryData = {
  businessHours: SchedulePeriod[];
  barberSchedules: SchedulePeriod[];
  appointments: OccupiedPeriod[];
};

export interface ScheduleRepository {
  findTimezone(barbershopId: string): Promise<string>;
  findAvailabilityData(input: {
    barbershopId: string;
    barberId: string;
    dayOfWeek: number;
    startOfDay: Date;
    endOfDay: Date;
  }): Promise<ScheduleRepositoryData>;
}
