import * as React from 'react';

import Image from 'next/image';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  noFocusBorder?: boolean;
  hasError?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, noFocusBorder = false, hasError = false, ...props },
    ref
  ) => {
    return (
      <div className='relative flex h-10 w-full bg-background px-4 py-3 text-sm'>
        <input
          type={type}
          className={cn(
            'w-full leading-4 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-placeholder focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            noFocusBorder
              ? 'leading-none shadow-none ring-offset-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0'
              : '',
            className
          )}
          ref={ref}
          {...props}
        />
        {hasError ? (
          <Image
            src='/icons/error.svg'
            width={16}
            height={16}
            alt='Error'
            className='right-3'
          />
        ) : null}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
