import { Dream } from "../../domain/Dream";
import { DreamRepository } from "../../domain/DreamRepository";

export class CreateDream {
  constructor(private readonly dreamRepository: DreamRepository) {}

  async run(
    id: string,
    date: Date,
    start: Date,
    end: Date,
    duration: number,
    quality: number,
    lucidity: number,
    state: string
  ): Promise<void> {
    const dream = new Dream(id, date, start, end, duration, quality, lucidity, state);
    await this.dreamRepository.save(dream);
  }
}
