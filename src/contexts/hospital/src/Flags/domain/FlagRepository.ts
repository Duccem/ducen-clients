import { Flag } from './Flag';

export interface FlagRepository {
  getFlags(): Promise<Flag[]>;
}
