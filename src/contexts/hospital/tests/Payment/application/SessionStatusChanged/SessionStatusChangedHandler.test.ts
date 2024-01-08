import { NotFoundError, UuidMother } from "core";
import { SessionStatusChangedCommand } from "../../../../src/Payment/application/SessionStatusChanged/SessionStatusChangedCommand";
import { SessionStatusChangedHandler } from "../../../../src/Payment/application/SessionStatusChanged/SessionStatusChangedHandler";
import { PaymentEventType } from "../../../../src/Payment/domain/PaymentEventType";
import { PaymentExpireEvent } from "../../../../src/Payment/domain/PaymentExpireEvent";
import { PaymentStatusEnum } from "../../../../src/Payment/domain/PaymentStatus";
import { PaymentSuccessEvent } from "../../../../src/Payment/domain/PaymentSuccessEvent";
import { EventBusMock } from "../../../__mocks__/EventBusMock";
import { MockPaymentRepository } from "../../__mocks__/MockPaymentRepository";
import { PaymentMother } from "../../domain/PaymentMother";

describe('SessionStatusChangedHandler', () => {
  let handler: SessionStatusChangedHandler;
  let repository: MockPaymentRepository;
  let eventBus: EventBusMock;

  beforeEach(() => {
    repository = new MockPaymentRepository();
    eventBus = new EventBusMock();
    handler = new SessionStatusChangedHandler(repository,eventBus);
  });

  it('should change session status to success', async () => {
    const command = new SessionStatusChangedCommand(UuidMother.hash(), PaymentEventType.SuccessSession, UuidMother.hash());
    const payment = PaymentMother.create();
    const event = new PaymentSuccessEvent({
      aggregateId: payment.id.value,
      guildId: payment.guildId.value,
      sessionId: payment.sessionId.value,
    })
    repository.returnFindBySessionId(payment);

    await handler.handle(command);

    repository.assertSaveIsCalledWith();
    eventBus.assertLastPublishedEventIs(event);
    expect(payment.status.value).toBe(PaymentStatusEnum.SUCCESS);
  });

  it('should change session status to failed', async () => {
    const command = new SessionStatusChangedCommand(UuidMother.hash(), PaymentEventType.FailSession, UuidMother.hash());
    const payment = PaymentMother.create();
    const event = new PaymentExpireEvent({
      aggregateId: payment.id.value,
      guildId: payment.guildId.value,
      sessionId: payment.sessionId.value,
    })
    repository.returnFindBySessionId(payment);

    await handler.handle(command);

    repository.assertSaveIsCalledWith();
    eventBus.assertLastPublishedEventIs(event);
    expect(payment.status.value).toBe(PaymentStatusEnum.FAILED);
  });

  it('should throw error for not existing signature', async () => {
    const command = new SessionStatusChangedCommand(UuidMother.hash(), PaymentEventType.SuccessSession, undefined);

    await handler.handle(command).catch(error => {
      expect(error.message).toBe('Signature not found');
    });
  });

  it('should throw error for not existing payment', async () => {
    const session = UuidMother.hash();
    const command = new SessionStatusChangedCommand(session, PaymentEventType.SuccessSession, UuidMother.hash());
    repository.returnFindBySessionId(undefined);

    await expect(handler.handle(command)).rejects.toBeInstanceOf(NotFoundError);

    repository.assertFindBySessionIdIsCalledWith(session);
  });
});
