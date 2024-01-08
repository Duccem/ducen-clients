import { Uuid } from 'core';
import { Guild } from 'hospital';
import { useDucenContext } from '../shared/common/DucenContext';
import { GuildStoreActions } from './GuildState';

export const useGuildHooks = (guildStore: GuildStoreActions) => {
  const { guildService } = useDucenContext();
  const { guildState, setGuildId } = guildStore;

  const registerGuild = async () => {
    const guild = new Guild(guildState.guild);
    await guildService.registerGuild(guild);
    setGuildId(guild.id.value);
  };

  const identifyGuild = async (id: string) => {
    const guild = await guildService.getGuildInformation(new Uuid(id));
    if (guild) {
      setGuildId(guild.id.value);
      return true;
    }
    return false;
  };

  const changePlan = async (plan: string) => {
    await guildService.choosePlan(new Uuid(guildState.guildId), plan);
  };

  return {
    registerGuild,
    identifyGuild,
    changePlan,
  };
};

export type GuildHooks = ReturnType<typeof useGuildHooks>;
