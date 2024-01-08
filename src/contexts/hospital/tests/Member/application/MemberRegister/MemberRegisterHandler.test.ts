
import { MemberRegisterHandler } from "../../../../src/Member/application/MemberRegister/MemberRegisterHandler";
import { MemberAlreadyExistError } from "../../../../src/Member/domain/MemberAlreadyExistError";
import { PasswordFormatError } from "../../../../src/Member/domain/PasswordFormatError";
import { EventBusMock } from "../../../__mocks__/EventBusMock";
import { MockMemberRepository } from "../../__mocks__/MockMemberRepository";
import { MemberCreatedDomainEventMother } from "../../domain/MemberCreatedDomainEventMother";
import { MemberMother } from "../../domain/MemberMother";
import { MemberRegisterCommandMother } from "../../domain/MemberRegisterCommandMother";

describe('MemberRegisterHandler', () => {
  let memberRepository: MockMemberRepository;
  let handler: MemberRegisterHandler;
  let eventBus: EventBusMock;

  beforeEach(() => {
    memberRepository = new MockMemberRepository();
    eventBus = new EventBusMock();
    handler = new MemberRegisterHandler(memberRepository, eventBus);
  });

  it('should register a member', async () => {
    const member = MemberMother.create();
    const command = MemberRegisterCommandMother.fromPrimitives(member.toPrimitives());
    const event = MemberCreatedDomainEventMother.fromMember(member);

    await handler.handle(command);

    expect(memberRepository.createMock).toHaveBeenCalled()
    eventBus.assertLastPublishedEventIs(event);
  });

  it('should find the member by nickname and throw a MemberAlreadyExist Error', async () => {
    const member = MemberMother.create();
    const command = MemberRegisterCommandMother.fromPrimitives(member.toPrimitives());
    memberRepository.identifyMock.mockReturnValueOnce(member).mockReturnValueOnce(null);
    await expect(handler.handle(command)).rejects.toBeInstanceOf(MemberAlreadyExistError);
  });

  it('should find the member by email and throw a MemberAlreadyExist Error', async () => {
    const member = MemberMother.create();
    const command = MemberRegisterCommandMother.fromPrimitives(member.toPrimitives());
    memberRepository.identifyMock.mockReturnValueOnce(null).mockReturnValueOnce(member);
    await expect(handler.handle(command)).rejects.toBeInstanceOf(MemberAlreadyExistError);
  });

  it('should throw a PasswordFormatIncorrect Error', async () => {
    const member = MemberMother.create();
    const command = MemberRegisterCommandMother.fromPrimitives({
      ...member.toPrimitives(),
      password: '123'
    });
    await expect(handler.handle(command)).rejects.toBeInstanceOf(PasswordFormatError);
  });
});
