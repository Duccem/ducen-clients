import { NotFoundError, UuidMother } from "core";
import { GetLastSessionHandler } from "../../../../src/Payment/application/GetLastSession/GetLastSessionHandler";
import { GetLastSessionQuery } from "../../../../src/Payment/application/GetLastSession/GetLastSessionQuery";
import { MockPaymentRepository } from "../../__mocks__/MockPaymentRepository";
import { PaymentMother } from "../../domain/PaymentMother";

describe('GetLastSessionHandler', () => {
  let handler: GetLastSessionHandler;
  let repository: MockPaymentRepository;

  beforeEach(() => {
    repository = new MockPaymentRepository();
    handler = new GetLastSessionHandler(repository);
  });

  it('should get last session', async () => {
    const query = new GetLastSessionQuery(UuidMother.random());
    const payment = PaymentMother.create({ guildId: query.guildId });

    repository.returnFindLastPaymentPendingByGuildId(payment);

    const response = await handler.handle(query);

    repository.assertFindLastPaymentPendingByGuildIdIsCalledWith(query.guildId);
    expect(response).toEqual(payment);
  });

  it('should throw a No payment session found error', async () => {
    const query = new GetLastSessionQuery(UuidMother.random());

    repository.returnFindLastPaymentPendingByGuildId(null);

    await expect(handler.handle(query)).rejects.toBeInstanceOf(NotFoundError);
  });
});
