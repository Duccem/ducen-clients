import { DreamRepository } from "../../domain/DreamRepository";

export class GetDreams {
  constructor(private dreamRepository: DreamRepository) {}
  async run(initDate: Date, endDate: Date) {
    console.log(initDate, endDate);
    const dream = await this.dreamRepository.findByDates(initDate, endDate);
    if (dream.length === 0) throw new Error("Dream not found");
    return dream;
  }
}
