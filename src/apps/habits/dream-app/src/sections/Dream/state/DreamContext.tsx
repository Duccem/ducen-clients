import { createContext, useContext } from "react";
import { DreamServices, useDreamServices } from "./DreamService";
import { DreamStoreActions, useDreamState } from "./DreamState";

export const DreamContext = createContext<DreamStoreActions & DreamServices>({} as DreamStoreActions & DreamServices);

export const DreamProvider = ({ children }: any) => {
  const state = useDreamState();
  const services = useDreamServices(state);
  return (
    <DreamContext.Provider value={{ ...state, ...services }}>
      {children}
    </DreamContext.Provider>
  );
};

export const useDreamContext = () => useContext(DreamContext);