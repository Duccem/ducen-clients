import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { UuidMother } from "core";
import { ApolloMemberService } from "../../../src/Member/infrastructure/ApolloMemberService";
import { MemberDataMother } from "../domain/MemberDataMother";
import { MemberMother } from "../domain/MemberMother";

describe('ApolloMemberRepository', () => {
  let client: ApolloClient<NormalizedCacheObject>;
  let repository: ApolloMemberService;
  beforeEach(() => {
    client = {
      mutate: jest.fn().mockResolvedValue({ data: null }),
      query: jest.fn(),
    } as unknown as ApolloClient<NormalizedCacheObject>;
    repository = new ApolloMemberService(client);
  });

  it('should register a member', async () => {
    const member = MemberMother.create();
    await repository.create(member);
    expect(client.mutate).toHaveBeenCalled();
  });

  it('should identify a member', async () => {
    const memberReturned = MemberMother.create();
    const response = { member: memberReturned.toPrimitives(), token: UuidMother.hash() }
    client.query = jest.fn().mockResolvedValue({ data: { login: response } })
    const data = await repository.identify(memberReturned.nickname.value, memberReturned.password.value);
    expect(client.query).toHaveBeenCalled();
    expect(data).toEqual({ member: memberReturned, token: response.token });
  });

  it('should recovery password', async () => {
    await repository.recoveryPassword(MemberMother.create().email.value);
    expect(client.mutate).toHaveBeenCalled();
  });

  it('should change password', async () => {
    await repository.changePassword(UuidMother.random(), MemberDataMother.password(), MemberDataMother.password());
    expect(client.mutate).toHaveBeenCalled();
  });
});
