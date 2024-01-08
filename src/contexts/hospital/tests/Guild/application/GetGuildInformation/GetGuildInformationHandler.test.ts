import { Uuid } from 'core';
import { GetGuildInformationHandler } from '../../../../src/Guild/application/GetGuildInformation/GetGuildInformationHandler';
import { GetGuildInformationQuery } from '../../../../src/Guild/application/GetGuildInformation/GetGuildInformationQuery';
import { GuildNotFoundError } from '../../../../src/Guild/domain/GuildNotFoundError';
import { MockGuildRepository } from '../../__mocks__/MockGuildRepository';
import { GuildMother } from '../../domain/GuildMother';

describe('GetGuildInformation', () => {
  let repository: MockGuildRepository;
  let handler: GetGuildInformationHandler;

  beforeEach(() => {
    repository = new MockGuildRepository();
    handler = new GetGuildInformationHandler(repository);
  });

  it('should return guild information', async () => {
    const guild = GuildMother.create();
    const query = new GetGuildInformationQuery(guild.id.value);
    repository.returnOnFindById(guild);
    const response = await handler.handle(query);
    expect(response).toEqual(guild);
  });

  it('should throw an error when guild does not exist', async () => {
    const query = new GetGuildInformationQuery(Uuid.random().value);
    repository.returnOnFindById(null);
    await expect(handler.handle(query)).rejects.toBeInstanceOf(GuildNotFoundError);
  });
});
