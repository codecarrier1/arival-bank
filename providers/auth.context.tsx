import React, {
  createContext,
  type PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from 'react';

import { type AuthContextData, AuthStep, type AuthUser } from '@/types/auth';

const AuthContext = createContext({} as AuthContextData);

export function AuthContextProvider({ children }: PropsWithChildren) {
  const [step, setStep] = useState<AuthStep>(AuthStep['Initial Info']);
  const [user, setUser] = useState<AuthUser>({
    username: '',
    email: '',
    password: '',
    country: '',
  });

  const value = useMemo(
    () => ({
      step,
      user,
      setStep,
      setUser,
    }),
    [step, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuthContext = () => ({ ...useContext(AuthContext) });
