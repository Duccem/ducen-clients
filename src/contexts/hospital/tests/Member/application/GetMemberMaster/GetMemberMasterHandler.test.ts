import { FormatError } from "core";
import { GetMemberMasterHandler } from "../../../../src/Member/application/GetMemberMaster/GetMemberMasterHandler";
import { GetMemberMasterQuery } from "../../../../src/Member/application/GetMemberMaster/GetMemberMasterQuery";
import { MemberNotExist } from "../../../../src/Member/domain/MemberNotExist";
import { MockMemberRepository } from "../../__mocks__/MockMemberRepository";
import { MemberMother } from "../../domain/MemberMother";

describe('GetMemberMasterHandler', () => {
  let repository: MockMemberRepository;
  let handler: GetMemberMasterHandler;

  beforeEach(() => {
    repository = new MockMemberRepository();
    handler = new GetMemberMasterHandler(repository);
  });

  it('should get the member master', async () => {
    const member = MemberMother.create();
    const guildId = member.guildId.value;
    const query = new GetMemberMasterQuery(guildId);
    repository.returnOnGetByGuildId(member);

    const response = await handler.handle(query);

    repository.assertGetByGuildIdHaveBeenCalledWith(member.guildId);
    expect(response).toEqual(member);
  });

  it('should not find a member throw an error', async () => {
    const member = MemberMother.create();
    const guildId = member.guildId.value;
    const query = new GetMemberMasterQuery(guildId);
    repository.returnOnGetByGuildId(null);

    await expect(handler.handle(query)).rejects.toBeInstanceOf(MemberNotExist);
  });

  it('should not be a uuid valid and throw an error ', async () => {
    const guildId = 'invalid-uuid';
    const query = new GetMemberMasterQuery(guildId);
    repository.returnOnGetByGuildId(null);

    await expect(handler.handle(query)).rejects.toBeInstanceOf(FormatError);
  });
});
