import { MongoArranger, MongoConnection, MongoConnectionMother } from "core";
import { PaymentRepository } from "../../../src/Payment/domain/PaymentRepository";
import { MongoPaymentRepository } from "../../../src/Payment/infrastructure/MongoPaymentRepository";
import { PaymentMother } from "../domain/PaymentMother";

describe('[PAYMENT][INFRA] MongoPaymentRepository', () => {
  let connection: MongoConnection;
  let arranger: MongoArranger;
  let paymentRepository: PaymentRepository;

  beforeAll(async () => {
    connection = await MongoConnectionMother.create();
    arranger = new MongoArranger(connection);
    paymentRepository = new MongoPaymentRepository(connection);
  });

  afterAll(async () => {
    await arranger.arrange();
    await connection.client.close();
  });

  beforeEach(async () => {
    await arranger.arrange();
  });

  it('should save a payment and find it by session id', async () => {
    const payment = PaymentMother.create();
    await paymentRepository.save(payment);
    const savedPayment = await paymentRepository.findBySessionId(payment.sessionId.value);
    expect(savedPayment).toEqual(payment);
  });

  it('should get null on search by session id', async () => {
    const savedPayment = await paymentRepository.findBySessionId('invalid-session-id');
    expect(savedPayment).toEqual(null);
  });

  it('should save a payment and find it by guild id', async () => {
    const payment = PaymentMother.create();
    await paymentRepository.save(payment);
    const savedPayment = await paymentRepository.findLastPaymentPendingByGuildId(payment.guildId.value);
    expect(savedPayment).toEqual(payment);
  });
})
