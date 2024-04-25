import { ApolloFlagRepository, FlagServices, FlagStoreActions, useFlagService, useFlagStore } from "@ducen-clients/hospital";
import { PropsWithChildren, createContext, useContext } from "react";
import { useApolloContext } from "../shared/ApolloProvider";

const FlagContext = createContext<FlagStoreActions & FlagServices>({} as FlagStoreActions & FlagServices);
export const FlagProvider = ({ children }: PropsWithChildren) => {
  const { client } = useApolloContext();
  const repository = new ApolloFlagRepository(client);
  const store = useFlagStore()
  const services = useFlagService(store, repository);
  return (
    <FlagContext.Provider value={{ ...store, ...services }}>
      {children}
    </FlagContext.Provider>
  );
}

export const useFlagContext = () => useContext(FlagContext);
