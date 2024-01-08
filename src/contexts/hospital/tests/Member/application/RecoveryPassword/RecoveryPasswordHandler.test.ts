import { RecoveryPasswordHandler } from "../../../../src/Member/application/RecoveryPassword/RecoveryPasswordHandler";
import { MemberNotExist } from "../../../../src/Member/domain/MemberNotExist";
import { MockMailSender } from "../../__mocks__/MockMailSender";
import { MockMemberRepository } from "../../__mocks__/MockMemberRepository";
import { MemberMother } from "../../domain/MemberMother";
import { RecoveryPasswordCommandMother } from "./RecoveryPasswordCommandMother";

describe('RecoveryPasswordHandler', () => {
  let memberRepository: MockMemberRepository;
  let mailSender: MockMailSender;
  let handler: RecoveryPasswordHandler;

  beforeEach(() => {
    memberRepository = new MockMemberRepository();
    mailSender = new MockMailSender();
    handler = new RecoveryPasswordHandler(memberRepository, mailSender, 'http://localhost:3000');
  });

  it('should send email with recovery password link', async () => {
    const member = MemberMother.create();
    const command = RecoveryPasswordCommandMother.create();
    memberRepository.returnOnGetByEmail(member);

    await handler.handle(command);
    memberRepository.assertGetByEmailHaveBeenCalledWith(command.email);
    mailSender.assertSendEmailHaveBeenCalledWith(
      command.email,
      'Ducen - Recovery Password',
      'recovery-password',
      {
        name: `${member.firstName.value} ${member.lastName.value}`,
        link: `http://localhost:3000/auth/new-password?id=${member.id.value}`,
      },
    );
  });

  it('should throw error when member not exist', async () => {
    const command = RecoveryPasswordCommandMother.create();
    memberRepository.returnOnGetByEmail(undefined);

    await expect(handler.handle(command)).rejects.toBeInstanceOf(MemberNotExist);
    memberRepository.assertGetByEmailHaveBeenCalledWith(command.email);
  });
});
