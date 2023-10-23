export enum AuthStep {
  'Initial Info',
  'Password Screen',
  'Review',
}

export type AuthUser = {
  username: string;
  email: string;
  country: string;
  password: string;
};

export type AuthContextData = {
  step: AuthStep;
  user: AuthUser;
  setStep: (s: AuthStep) => void;
  setUser: (user: AuthUser) => void;
};
