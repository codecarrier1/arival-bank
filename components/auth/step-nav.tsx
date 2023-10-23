import React from 'react';

import { useAuthContext } from '@/providers/auth.context';
import { AuthStep } from '@/types/auth';

export const StepNav = () => {
  const { step } = useAuthContext();

  return (
    <div className='static left-10 top-52 space-y-5 md:absolute lg:left-20 '>
      {Object.keys(AuthStep)
        .filter((key) => isNaN(Number(key)))
        .map((key) => (
          <div className='flex items-center gap-3' key={key}>
            <div
              className={`aspect-square w-4 rounded-sm ${
                AuthStep[key as keyof typeof AuthStep] === step
                  ? 'bg-active'
                  : 'bg-secondary-foreground'
              }`}
            />
            {key}
          </div>
        ))}
    </div>
  );
};
