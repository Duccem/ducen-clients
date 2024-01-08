'use client'
import { PropsWithChildren, createContext, useContext } from 'react';
import { GuildService, MemberService, PaymentService } from 'hospital';
import { Configurations } from '../../../config/Configurations';
import { GuildProvider } from '../../guild/GuildContext';
import { MemberProvider } from '../../member/MemberContext';
import { PaymentProvider } from '../../payment/PaymentContext';
import { AuthProvider } from '../auth/AuthContext';
import { combineComponents } from './combinedContexts';

export interface DucenContextState {
  configurations: Configurations,
  guildService: GuildService,
  memberService: MemberService,
  paymentService: PaymentService,
}

export const DucenContext = createContext<DucenContextState>({} as DucenContextState);

const providers = [
  AuthProvider,
  GuildProvider,
  MemberProvider,
  PaymentProvider
]

export const AppContextProvider = combineComponents(...providers)

export const DucenContextProvider = ({ children, ...repositories }: PropsWithChildren<DucenContextState>) => {
  return (
    <DucenContext.Provider value={{...repositories}}>
      <AppContextProvider>
        {children}
      </AppContextProvider>
    </DucenContext.Provider>
  )
}

export const useDucenContext = () => useContext(DucenContext);
