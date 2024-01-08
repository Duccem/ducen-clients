import { Primitives } from 'core';
import { useReducer } from 'react';
import { Member } from 'hospital';

export type MemberState = {
  member: Primitives<Member>;
  guildId: string;
};

export const initialMemberState: MemberState = {
  member: <Primitives<Member>>{},
  guildId: '',
};

type SetMember = { type: 'set_member'; payload: Primitives<Member> };
type SetGuildID = { type: 'set_guild_id'; payload: string };
type SetCredentials = { type: 'set_credentials'; payload: { nickname: string; password: string } };

export type MemberActions = SetMember | SetGuildID | SetCredentials;

const reducers = {
  set_member: (state: MemberState, action: SetMember): MemberState => ({ ...state, member: action.payload }),
  set_guild_id: (state: MemberState, action: SetGuildID): MemberState => ({ ...state, guildId: action.payload }),
  set_credentials: (state: MemberState, action: SetCredentials): MemberState => ({
    ...state,
    member: { ...state.member, ...action.payload },
  }),
};

export function MemberReducer(state: MemberState, action: MemberActions) {
  const updateState = reducers[action.type] || (() => state);
  return updateState(state, action as any);
}

export function useMemberStore() {
  const [memberState, memberDispatch] = useReducer(MemberReducer, initialMemberState);

  const setMember = (payload: Primitives<Member>) => {
    memberDispatch({ type: 'set_member', payload });
  };

  const setGuildId = (payload: string) => {
    memberDispatch({ type: 'set_guild_id', payload });
  };

  const setCredentials = (payload: { nickname: string; password: string }) => {
    memberDispatch({ type: 'set_credentials', payload });
  };

  const getCredentials = () => ({
    nickname: memberState.member.nickname,
    password: memberState.member.password,
  });

  return { memberState, setMember, setGuildId, setCredentials, getCredentials };
}

export type MemberStoreActions = ReturnType<typeof useMemberStore>;
