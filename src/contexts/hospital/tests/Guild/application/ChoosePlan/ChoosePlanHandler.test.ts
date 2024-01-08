import { UuidMother } from 'core';
import { ChoosePlanHandler } from '../../../../src/Guild/application/ChoosePlan/ChoosePlanHandler';
import { GuildNotFoundError } from '../../../../src/Guild/domain/GuildNotFoundError';
import { MockGuildRepository } from '../../__mocks__/MockGuildRepository';
import { GuildMother } from '../../domain/GuildMother';
import { ChoosePlanCommandMother } from './ChoosePlanCommandMother';

describe('ChoosePlanHandler', () => {
  let repository: MockGuildRepository;
  let handler: ChoosePlanHandler;

  beforeEach(() => {
    repository = new MockGuildRepository();
    handler = new ChoosePlanHandler(repository);
  });

  it('should change the guild plan', async () => {
    const guild = GuildMother.create();
    repository.returnOnFindById(guild);
    const command = ChoosePlanCommandMother.random(guild.id.value);
    await handler.handle(command);
    repository.assertFindByIdHaveBeenCalledWith(guild.id);
    repository.assertRegisterHaveBeenCalledWith(guild);
    expect(guild.getPlan()).toBe(command.plan);
  });

  it('should throw an error when the guild does not exist', async () => {
    repository.returnOnFindById(null);
    const command = ChoosePlanCommandMother.random(UuidMother.random());
    await expect(handler.handle(command)).rejects.toBeInstanceOf(GuildNotFoundError);
  });
});
