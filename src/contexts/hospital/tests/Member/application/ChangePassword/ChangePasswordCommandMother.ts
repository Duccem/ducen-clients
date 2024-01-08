import { MotherCreator } from 'core';
import { ChangePasswordCommand } from '../../../../src/Member/application/ChangePassword/ChangePasswordCommand';

export class ChangePasswordCommandMother {
  static create(memberId: string, oldPassword: string): ChangePasswordCommand {
    return new ChangePasswordCommand(memberId, MotherCreator.random().helpers.fromRegExp(/[A-Z][a-z][0-9][#?!@$%^&*-]{8}/), oldPassword);
  }
}
