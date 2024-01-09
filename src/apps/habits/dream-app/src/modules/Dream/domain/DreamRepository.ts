import { Dream } from "./Dream";

export interface DreamRepository {
  createTable(): Promise<void>;
  save(dream: Dream): Promise<void>;
  findByDate(date: Date): Promise<Dream | null>;
  findByDates(startDate: Date, endDate: Date): Promise<Dream[]>;
}
