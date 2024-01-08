import { UuidMother } from "core";
import { LoginHandler } from "../../../../src/Member/application/Login/LoginHandler";
import { LoginQuery } from "../../../../src/Member/application/Login/LoginQuery";
import { AuthService } from "../../../../src/Member/domain/AuthService";
import { IncorrectPassword } from "../../../../src/Member/domain/IncorrectPassword";
import { MemberNotExist } from "../../../../src/Member/domain/MemberNotExist";
import { JWTAuthService } from "../../../../src/Member/infrastructure/JWTAuthService";
import { MockMemberRepository } from "../../__mocks__/MockMemberRepository";
import { MemberMother } from "../../domain/MemberMother";

describe('LoginHandler', () => {
  let memberRepository: MockMemberRepository;
  let authService: AuthService;
  let handler: LoginHandler;

  beforeEach(() => {
    memberRepository = new MockMemberRepository();
    authService = new JWTAuthService(UuidMother.hash());
    handler = new LoginHandler(memberRepository, authService);
  });

  it('should login a member', async () => {
    const member = MemberMother.create();
    const query = new LoginQuery(member.email.value, member.password.value);
    member.password.encrypt();

    memberRepository.returnOnIdentify(member);
    const response = await handler.handle(query);

    memberRepository.assertIdentifyHaveBeenCalledWith(member.email.value);
    expect(response).toEqual({
      token: authService.generateToken(member),
      member: member.toPrimitives(),
    });
  });

  it('should be incorrect password error throws', async () => {
    const member = MemberMother.create();
    const query = new LoginQuery(member.email.value, 'invalid-password');
    member.password.encrypt();

    memberRepository.returnOnIdentify(member);
    await expect(handler.handle(query)).rejects.toBeInstanceOf(IncorrectPassword);
  });

  it('should be incorrect password error throws', async () => {
    const query = new LoginQuery('correo', 'invalid-password');
    memberRepository.returnOnIdentify(null);
    await expect(handler.handle(query)).rejects.toBeInstanceOf(MemberNotExist);
  });
});
