import React, { useCallback } from 'react';

import { useToast } from '@/components/ui/use-toast';
import { useAuthContext } from '@/providers/auth.context';
import { AuthStep, type AuthUser } from '@/types/auth';

import { AuthHeader } from './header';
import { InitialInfo } from './initial-info';
import { PasswordScreen } from './password-screen';
import { Review } from './review';
import { StepNav } from './step-nav';

export const Auth = () => {
  const { step, user, setUser, setStep } = useAuthContext();
  const { toast } = useToast();

  const handleNextStep = useCallback(
    (data?: Partial<AuthUser>) => {
      setUser({ ...user, ...data });
      if (step !== AuthStep.Review) {
        setStep(step + 1);
      } else {
        toast({
          title: 'User registered successfully.',
        });
      }
    },
    [setUser, user, step, setStep, toast]
  );

  const Components: { [key in AuthStep]: React.ReactNode } = {
    [AuthStep['Initial Info']]: <InitialInfo handleNextStep={handleNextStep} />,
    [AuthStep['Password Screen']]: (
      <PasswordScreen handleNextStep={handleNextStep} />
    ),
    [AuthStep.Review]: <Review handleNextStep={handleNextStep} />,
  };

  return (
    <div className='relative flex h-screen w-screen flex-col items-center gap-16 px-5 py-20'>
      <AuthHeader />
      <StepNav />
      <div className='w-full max-w-[400px] rounded-2xl bg-foreground px-5 py-10'>
        {Components[step]}
      </div>
    </div>
  );
};
