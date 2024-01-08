import { WordMother } from 'core';
import { ChangePasswordHandler } from '../../../../src/Member/application/ChangePassword/ChangePasswordHandler';
import { IncorrectPassword } from '../../../../src/Member/domain/IncorrectPassword';
import { MemberNotExist } from '../../../../src/Member/domain/MemberNotExist';
import { MockMemberRepository } from '../../__mocks__/MockMemberRepository';
import { MemberMother } from '../../domain/MemberMother';
import { ChangePasswordCommandMother } from './ChangePasswordCommandMother';

describe('ChangePasswordHandler', () => {
  let repository: MockMemberRepository;
  let handler: ChangePasswordHandler;

  beforeEach(() => {
    repository = new MockMemberRepository();
    handler = new ChangePasswordHandler(repository);
  });

  it('should change the password of a member', async () => {
    const member = MemberMother.create();
    const command = ChangePasswordCommandMother.create(member.id.value, member.password.value);
    member.password.encrypt();
    repository.returnOnGetById(member);
    await handler.handle(command);
    repository.assertGetByIdHaveBeenCalledWith(member.id);
    repository.assertCreateHaveBeenCalledWith(member.id, member);
  });

  it('should throw MemberNotExist Error', async () => {
    const member = MemberMother.create();
    const command = ChangePasswordCommandMother.create(member.id.value, member.password.value);
    repository.returnOnGetById(null);
    await expect(handler.handle(command)).rejects.toBeInstanceOf(MemberNotExist);
  });

  it('should throw IncorrectPassword Error', async () => {
    const member = MemberMother.create();
    const command = ChangePasswordCommandMother.create(member.id.value, WordMother.random({ maxLength: 13 }));
    member.password.encrypt();
    repository.returnOnGetById(member);
    await expect(handler.handle(command)).rejects.toBeInstanceOf(IncorrectPassword);
  });
});
