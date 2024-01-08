import { Nullable } from "core";
import { Member } from "./Member";

export interface MemberService {
  identify(username: string, password: string): Promise<Nullable<{ member: Member; token: string }>>;
  create(member: Member): Promise<void>;
  recoveryPassword(email: string): Promise<void>;
  changePassword(memberId: string, newPassword: string, oldPassword: string): Promise<void>;
}
