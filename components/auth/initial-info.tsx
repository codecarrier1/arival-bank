import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { type AuthUser } from '@/types/auth';

const formSchema = z.object({
  username: z
    .string()
    .min(4, {
      message: 'Username must be at least 4 characters.',
    })
    .max(12, {
      message: 'Username must be less than 13 characters.',
    }),
  email: z
    .string({
      required_error: 'Email is required.',
    })
    .min(1, {
      message: 'Email is required.',
    })
    .email('Email is invalid'),
  country: z
    .string({
      required_error: 'Country is required.',
    })
    .min(1, { message: 'Country is required.' }),
});

type InitialInfoProps = {
  handleNextStep: (data: Partial<AuthUser>) => void;
};

export const InitialInfo: React.FC<InitialInfoProps> = ({ handleNextStep }) => {
  const { data: countries, isLoading: isLoadingCountries } =
    useQuery<CountriesResponse>({
      queryKey: ['countries'],
      queryFn: () =>
        axios
          .get<CountriesResponse>(
            'https://restcountries.com/v3.1/all?fields=name'
          )
          .then((res) => res.data),
      select: (data) =>
        data?.sort((a, b) => a.name.official.localeCompare(b.name.official)),
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
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
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  noFocusBorder
                  placeholder='Input username'
                  {...field}
                  hasError={!!form.formState.errors.username}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  noFocusBorder
                  placeholder='Input email'
                  {...field}
                  hasError={!!form.formState.errors.email}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='country'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger
                      className={
                        field.value ? 'text-primary' : 'text-placeholder'
                      }
                    >
                      <SelectValue
                        placeholder={
                          isLoadingCountries
                            ? 'Loading countries...'
                            : 'Select a company type'
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {!isLoadingCountries
                      ? countries?.map((country) => (
                          <SelectItem
                            value={country.name.official}
                            className='cursor-pointer'
                            key={country.name.official}
                          >
                            {country.name.official}
                          </SelectItem>
                        ))
                      : null}
                  </SelectContent>
                </Select>
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
