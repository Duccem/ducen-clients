import { MotherCreator, Primitives, UuidMother } from "core";
import { Payment } from "../../../src/Payment/domain/Payment";
import { PaymentStatusEnum } from "../../../src/Payment/domain/PaymentStatus";

export class PaymentMother {
  static create(data?: Partial<Primitives<Payment>>): Payment {
    return new Payment({
      id: UuidMother.random(),
      guildId: UuidMother.random(),
      paymentDate: new Date(),
      sessionId: UuidMother.hash(),
      status: PaymentStatusEnum.PENDING,
      createdAt: new Date(),
      updatedAt: new Date(),
      url: MotherCreator.random().internet.url(),
      ...data,
    });
  }
}
