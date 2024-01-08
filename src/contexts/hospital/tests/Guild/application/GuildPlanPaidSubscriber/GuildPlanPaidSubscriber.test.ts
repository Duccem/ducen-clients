import { UuidMother } from 'core';
import { GuildPlanPaidSubscriber } from '../../../../src/Guild/application/GuildPlanPaid/GuildPlanPaidSubscriber';
import { GuildNotFoundError } from '../../../../src/Guild/domain/GuildNotFoundError';
import { MockGuildRepository } from '../../__mocks__/MockGuildRepository';
import { GuildMother } from '../../domain/GuildMother';
import { PaymentSuccessEventMother } from './PaymentSuccessEventMother';

describe('GuildPlanPaid', () => {
  let subscriber: GuildPlanPaidSubscriber;
  let repository: MockGuildRepository;

  beforeEach(() => {
    repository = new MockGuildRepository();
    subscriber = new GuildPlanPaidSubscriber(repository);
  });

  it('should update guild plan', async () => {
    const guild = GuildMother.create();
    const event = PaymentSuccessEventMother.create(guild.id.value);
    repository.returnOnFindById(guild);
    await subscriber.on(event);
    repository.assertFindByIdHaveBeenCalledWith(guild.id);
    repository.assertRegisterHaveBeenCalledWith(guild);
  });

  it('should throw error when guild is not found', async () => {
    const event = PaymentSuccessEventMother.create(UuidMother.random());
    repository.returnOnFindById(null);
    await expect(subscriber.on(event)).rejects.toBeInstanceOf(GuildNotFoundError);
  });
});
