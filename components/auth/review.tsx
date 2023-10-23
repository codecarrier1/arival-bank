import React from 'react';

import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/providers/auth.context';

type ReviewProps = {
  handleNextStep: () => void;
};

export const Review: React.FC<ReviewProps> = ({ handleNextStep }) => {
  const { user } = useAuthContext();

  return (
    <div className='space-y-10'>
      <div className='space-y-6'>
        <div className='flex justify-between'>
          <span className='text-sm text-description'>Username</span>
          <span className='text-sm font-medium text-white'>
            {user.username}
          </span>
        </div>
        <div className='flex justify-between'>
          <span className='text-sm text-description'>Email</span>
          <span className='text-sm font-medium text-white'>{user.email}</span>
        </div>
        <div className='flex justify-between'>
          <span className='text-sm text-description'>Country</span>
          <span className='text-sm font-medium text-white'>{user.country}</span>
        </div>
      </div>
      <Button className='w-full' variant='primary' onClick={handleNextStep}>
        Continue
      </Button>
    </div>
  );
};
