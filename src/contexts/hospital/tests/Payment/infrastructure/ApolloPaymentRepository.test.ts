import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { MotherCreator, Uuid, UuidMother } from "core";
import { Payment } from "../../../src/Payment/domain/Payment";
import { PaymentStatusEnum } from "../../../src/Payment/domain/PaymentStatus";
import { ApolloPaymentService } from "../../../src/Payment/infrastructure/ApolloPaymentService";

describe('[PAYMENT][INFRA] ApolloPaymentRepository', () => {
  let client: ApolloClient<NormalizedCacheObject>;
  let repository: ApolloPaymentService;

  beforeEach(() => {
    client = {
      mutate: jest.fn().mockResolvedValue({ data: null }),
      query: jest.fn(),
    } as unknown as ApolloClient<NormalizedCacheObject>;
    repository = new ApolloPaymentService(client);
  });

  it('should create a payment', async () => {
    await repository.createSession(new Uuid(UuidMother.random()), 'monthly');
    expect(client.mutate).toHaveBeenCalled();
  });

  it('should get last payment', async () => {
    const response = {
      id: UuidMother.random(),
      sessionId: UuidMother.hash(),
      guildId: UuidMother.random(),
      priceId: MotherCreator.random().commerce.price(),
      createdAt: new Date(),
      updatedAt: new Date(),
      paymentDate: new Date(),
      status: PaymentStatusEnum.PENDING,
      url: 'http://localhost:3000',
    };
    const payment = new Payment(response);
    client.query = jest.fn().mockResolvedValue({ data: { getLastSession: response } });
    const data = await repository.getLastSession(new Uuid(UuidMother.random()));
    expect(client.query).toHaveBeenCalled();
    expect(data).toEqual(payment);
  });
})
