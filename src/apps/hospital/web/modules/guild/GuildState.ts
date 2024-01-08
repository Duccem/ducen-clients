import { Primitives } from 'core';
import { useReducer } from 'react';
import { Guild } from 'hospital';

export type GuildState = {
  guild: Primitives<Guild>;
  guildId: string;
};
export const initialGuildState: GuildState = {
  guild: <Primitives<Guild>>{},
  guildId: '',
};

type SetGuild = { type: 'set_guild'; payload: Primitives<Guild> };
type SetGuildID = { type: 'set_guild_id'; payload: string };

export type GuildActions = SetGuild | SetGuildID;

const reducers = {
  set_guild: (state: GuildState, action: SetGuild): GuildState => ({ ...state, guild: action.payload }),
  set_guild_id: (state: GuildState, action: SetGuildID): GuildState => ({ ...state, guildId: action.payload }),
};

export function GuildReducer(state: GuildState, action: GuildActions) {
  const updateState = reducers[action.type] || (() => state);
  return updateState(state, action as any);
}

export function useGuildStore() {
  const [guildState, guildDispatch] = useReducer(GuildReducer, initialGuildState);

  const setGuild = (payload: Primitives<Guild>) => {
    guildDispatch({ type: 'set_guild', payload });
  };

  const setGuildId = (payload: string) => {
    guildDispatch({ type: 'set_guild_id', payload });
  };

  return { guildState, setGuild, setGuildId };
}
export type GuildStoreActions = ReturnType<typeof useGuildStore>;
