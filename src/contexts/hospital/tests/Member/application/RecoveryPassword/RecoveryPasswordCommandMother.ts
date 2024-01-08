import { EmailMother } from "core";
import { RecoveryPasswordCommand } from "../../../../src/Member/application/RecoveryPassword/RecoveryPasswordCommand";

export class RecoveryPasswordCommandMother {
  static create(): RecoveryPasswordCommand {
    return new RecoveryPasswordCommand(EmailMother.random({}));
  }
}
