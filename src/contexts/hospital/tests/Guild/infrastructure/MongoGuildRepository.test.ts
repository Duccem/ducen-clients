import { MongoArranger, MongoConnection, MongoConnectionMother } from 'core';
import { GuildRepository } from '../../../src/Guild/domain/GuildRepository';
import { MongoGuildRepository } from '../../../src/Guild/infrastructure/MongoGuildRepository';
import { GuildMother } from '../domain/GuildMother';

describe('MongoGuildRepository', () => {
  let connection: MongoConnection;
  let arranger: MongoArranger;
  let guildRepository: GuildRepository;

  beforeAll(async () => {
    connection = await MongoConnectionMother.create();
    arranger = new MongoArranger(connection);
    guildRepository = new MongoGuildRepository(connection);
  });
  afterAll(async () => {
    await arranger.arrange();
    await connection.client.close();
  });

  beforeEach(async () => {
    await arranger.arrange();
  });

  it('should save a guild and find it by id', async () => {
    const guild = GuildMother.create();
    await guildRepository.registerGuild(guild);
    const savedGuild = await guildRepository.findGuildById(guild.id);
    expect(savedGuild).toEqual(guild);
  });

  it('should save a guild and find it by name', async () => {
    const guild = GuildMother.create();
    await guildRepository.registerGuild(guild);
    const savedGuild = await guildRepository.findGuildByName(guild.name.value);
    expect(savedGuild).toEqual(guild);
  });
});
