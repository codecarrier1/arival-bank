import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { type AuthUser } from '@/types/auth';

const formSchema = z
  .object({
    password: z
      .string()
      .min(8, {
        message: 'Password must be at least 8 characters.',
      })
      .max(16, {
        message: 'Password must be less than 17 characters.',
      }),
    confirmPassword: z.string().min(1, { message: 'Required' }),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type PasswordScreenProps = {
  handleNextStep: (data: Partial<AuthUser>) => void;
};

export const PasswordScreen: React.FC<PasswordScreenProps> = ({
  handleNextStep,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    mode: 'all',
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    handleNextStep(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-10'>
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  noFocusBorder
                  type='password'
                  placeholder='Input password'
                  {...field}
                  hasError={!!form.formState.errors.password}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Repeat password</FormLabel>
              <FormControl>
                <Input
                  noFocusBorder
                  placeholder='Repeat password'
                  type='password'
                  {...field}
                  hasError={!!form.formState.errors.confirmPassword}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={!form.formState.isValid}
          className='w-full'
          variant='primary'
          type='submit'
        >
          Continue
        </Button>
      </form>
    </Form>
  );
};
