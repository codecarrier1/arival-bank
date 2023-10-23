import React from 'react';

import { useAuthContext } from '@/providers/auth.context';
import { AuthStep } from '@/types/auth';

export const AuthHeader = () => {
  const { step } = useAuthContext();

  return (
    <div>
      <h1 className='text-4xl font-medium text-primary'>Super test form</h1>
      <h3 className='mt-4 text-center text-xl text-secondary'>
        {AuthStep[step]}
      </h3>
    </div>
  );
};
