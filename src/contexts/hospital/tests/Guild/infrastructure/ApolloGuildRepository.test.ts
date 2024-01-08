import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { ApolloGuildService } from '../../../src/Guild/infrastructure/ApolloGuildService';
import { GuildMother } from '../domain/GuildMother';
import { GuildPlanMother } from '../domain/GuildPlanMother';

describe('ApolloGuildService', () => {
  let client: ApolloClient<NormalizedCacheObject>;
  let repository: ApolloGuildService;
  beforeEach(() => {
    client = {
      mutate: jest.fn().mockResolvedValue({ data: null }),
      query: jest.fn(),
    } as unknown as ApolloClient<NormalizedCacheObject>;
    repository = new ApolloGuildService(client);
  });

  it('should register a guild', async () => {
    const guild = GuildMother.create();
    await repository.registerGuild(guild);
    expect(client.mutate).toHaveBeenCalled();
  });

  it('should ocurred an error while register', async () => {
    const guild = GuildMother.create();
    client.mutate = jest.fn().mockResolvedValue({ errors: [{ message: 'Error' }] });
    await expect(repository.registerGuild(guild)).rejects.toThrowError('Error');
    expect(client.mutate).toHaveBeenCalled();
  });

  it('should get guild information', async () => {
    const guild = GuildMother.create();
    client.query = jest.fn().mockResolvedValue({ data: { guildInformation: guild.toPrimitives() } });
    const response = await repository.getGuildInformation(guild.id);
    expect(client.query).toHaveBeenCalled();
    expect(response).toEqual(guild);
  });

  it('should get an error trying to retrieve the guild information', async () => {
    const guild = GuildMother.create();
    client.query = jest.fn().mockResolvedValue({ errors: [{ message: 'Error' }] });
    await expect(repository.getGuildInformation(guild.id)).rejects.toThrowError('Error');
    expect(client.query).toHaveBeenCalled();
  });

  it('should choose a plan', async () => {
    const guild = GuildMother.create();
    await repository.choosePlan(guild.id, GuildPlanMother.random().value);
    expect(client.mutate).toHaveBeenCalled();
  });

  it('should throw an error while choose plan', async () => {
    const guild = GuildMother.create();
    client.mutate = jest.fn().mockResolvedValue({ errors: [{ message: 'Error' }] });
    await expect(repository.choosePlan(guild.id, GuildPlanMother.random().value)).rejects.toThrowError('Error');
    expect(client.mutate).toHaveBeenCalled();
  });
});
