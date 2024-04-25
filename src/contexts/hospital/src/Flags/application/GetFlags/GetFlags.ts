import { Flag } from '../../domain/Flag';
import { FlagRepository } from '../../domain/FlagRepository';

export class GetFlags {
  constructor(private readonly flagRepository: FlagRepository) {}
  async run(): Promise<Flag[]> {
    return await this.flagRepository.getFlags();
  }
}
