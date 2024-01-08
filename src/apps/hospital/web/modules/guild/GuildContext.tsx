import { createContext, useContext } from "react";
import { GuildHooks, useGuildHooks } from "./GuildHooks";
import { GuildStoreActions, useGuildStore } from "./GuildState";

export const GuildContext = createContext<GuildStoreActions & GuildHooks>({} as GuildStoreActions & GuildHooks);

export const GuildProvider = ({ children }: any) => {
  const guildStore = useGuildStore();
  const guildHooks = useGuildHooks(guildStore);
  return (
    <GuildContext.Provider value={{
      ...guildStore,
      ...guildHooks
    }}>
      {children}
    </GuildContext.Provider>
  )
}

export const useGuildContext = () => useContext(GuildContext);
