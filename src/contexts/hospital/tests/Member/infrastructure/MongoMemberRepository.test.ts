import { MongoArranger, MongoConnection, MongoConnectionMother, Uuid, UuidMother } from "core";
import { MemberRepository } from "../../../src/Member/domain/MemberRepository";
import { MongoMemberRepository } from "../../../src/Member/infrastructure/MongoMemberRepository";
import { MemberMother } from "../domain/MemberMother";

describe('MongoMemberRepository', () => {
  let connection: MongoConnection;
  let arranger: MongoArranger;
  let memberRepository: MemberRepository;

  beforeAll(async () => {
    connection = await MongoConnectionMother.create();
    arranger = new MongoArranger(connection);
    memberRepository = new MongoMemberRepository(connection);
  });

  afterAll(async () => {
    await arranger.arrange();
    await connection.client.close();
  });

  beforeEach(async () => {
    await arranger.arrange();
  });

   it('should save a member and find it by id', async () => {
    const member = MemberMother.create();
    await memberRepository.save(member.id, member);
    const savedMember = await memberRepository.getById(member.id);
    expect(savedMember).toEqual(member);
  });

  it('should get null on search by id', async () => {
    const savedMember = await memberRepository.getById(new Uuid(UuidMother.random()));
    expect(savedMember).toEqual(null);
  });

  it('should save a member and find it by email', async () => {
    const member = MemberMother.create();
    await memberRepository.save(member.id, member);
    const savedMember = await memberRepository.getByEmail(member.email.value);
    expect(savedMember).toEqual(member);
  });

  it('should get null on search by email', async () => {
    const savedMember = await memberRepository.getByEmail('invalid-email');
    expect(savedMember).toEqual(null);
  });

  it('should save a member and find it by nickname', async () => {
    const member = MemberMother.create();
    await memberRepository.save(member.id, member);
    const savedMember = await memberRepository.identify(member.nickname.value);
    expect(savedMember).toEqual(member);
  });

  it('should get null on search by nickname', async () => {
    const savedMember = await memberRepository.identify('invalid-nickname');
    expect(savedMember).toEqual(null);
  });

  it('should save a member and find it by guildId', async () => {
    const member = MemberMother.create({ roleId: 'MASTER' });
    await memberRepository.save(member.id, member);
    const savedMember = await memberRepository.getByGuildId(member.guildId);
    expect(savedMember).toEqual(member);
  });

  it('should get null on search by guildId', async () => {
    const savedMember = await memberRepository.getByGuildId(new Uuid(UuidMother.random()));
    expect(savedMember).toEqual(null);
  });
})
