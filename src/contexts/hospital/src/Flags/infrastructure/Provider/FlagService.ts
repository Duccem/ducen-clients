import { GetFlags } from '../../application/GetFlags/GetFlags';
import { FlagRepository } from '../../domain/FlagRepository';
import { FlagStoreActions } from './FlagStore';

export function useFlagService({ setFlags }: FlagStoreActions, repository: FlagRepository) {
  const getFlags = new GetFlags(repository);
  return {
    getFlags: async () => {
      const flags = await getFlags.run();
      setFlags(flags);
    },
  };
}

export type FlagServices = ReturnType<typeof useFlagService>;
