import { Member } from 'hospital';
import { useDucenContext } from '../shared/common/DucenContext';
import { MemberStoreActions } from './MemberState';

export const useMemberHooks = (memberStore: MemberStoreActions) => {
  const { memberService } = useDucenContext();
  const { memberState, setMember } = memberStore;

  const registerMember = async () => {
    const member = new Member({
      ...memberState.member,
      guildId: memberState.guildId,
    });

    await memberService.create(member);
  };

  const login = async (identifier: string, password: string) => {
    const { member, token } = await memberService.identify(identifier, password);
    setMember(member.toPrimitives());
    localStorage.setItem('token', token);
  };

  const recoveryPassword = async (email: string) => {
    await memberService.recoveryPassword(email);
  };

  const changePassword = async (memberId: string, newPassword: string, oldPassword: string) => {
    await memberService.changePassword(memberId, newPassword, oldPassword);
  };

  return {
    registerMember,
    login,
    recoveryPassword,
    changePassword,
  };
};

export type MemberHooks = ReturnType<typeof useMemberHooks>;
