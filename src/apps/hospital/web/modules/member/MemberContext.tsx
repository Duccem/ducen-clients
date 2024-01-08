import { createContext, useContext } from "react";
import { MemberHooks, useMemberHooks } from "./MemberHooks";
import { MemberStoreActions, useMemberStore } from "./MemberState";

export const MemberContext = createContext<MemberStoreActions & MemberHooks>({} as MemberStoreActions & MemberHooks);

export const MemberProvider = ({ children }: any) => {
  const memberStore = useMemberStore();
  const memberHooks = useMemberHooks(memberStore);
  return (
    <MemberContext.Provider value={{
      ...memberStore,
      ...memberHooks
    }}>
      {children}
    </MemberContext.Provider>
  )
}

export const useMemberContext = () => useContext(MemberContext);
