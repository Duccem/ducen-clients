import { RegisterGuildHandler } from '../../../../src/Guild/application/RegisterGuild/RegisterGuildHandler';
import { GuildAlreadyExistError } from '../../../../src/Guild/domain/GuildAlreadyExistError';
import { EventBusMock } from '../../../__mocks__/EventBusMock';
import { MockGuildRepository } from '../../__mocks__/MockGuildRepository';
import { GuildCreatedDomainEventMother } from '../../domain/GuildCreatedDomainEventMother';
import { GuildMother } from '../../domain/GuildMother';
import { RegisterGuildCommandMother } from './RegisterGuildCommandMother';

describe('RegisterGuild', () => {
  let repository: MockGuildRepository;
  let handler: RegisterGuildHandler;
  let eventBus: EventBusMock;

  beforeEach(() => {
    repository = new MockGuildRepository();
    eventBus = new EventBusMock();
    handler = new RegisterGuildHandler(repository, eventBus);
  });

  it('should register a guild', async () => {
    const command = RegisterGuildCommandMother.create();
    const guild = GuildMother.create(command.guild);
    const event = GuildCreatedDomainEventMother.fromGuild(guild);
    await handler.handle(command);

    repository.assertRegisterHaveBeenCalledWith(guild);
    eventBus.assertLastPublishedEventIs(event);
  });

  it('should throw an error when guild already exist', async () => {
    const command = RegisterGuildCommandMother.create();
    const guild = GuildMother.create(command.guild);
    repository.returnOnFindByName(guild);
    await expect(handler.handle(command)).rejects.toBeInstanceOf(GuildAlreadyExistError);
  });
});
