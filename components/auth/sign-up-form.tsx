'use client';

import * as z from 'zod';
import Link from 'next/link';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { signIn } from 'next-auth/react';
import axios, { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { RegisterSchema } from '@/schemas';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

export default function SignUpForm() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirm: ''
    }
  });

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    try {
      setLoading(true);

      const response = await axios.post('/api/register', values);

      if (response.data.success) {
        form.reset();

        toast({
          variant: 'default',
          title: 'Success!',
          description: 'User successfully registered.'
        });

        await signIn('credentials', {
          email: values.email,
          password: values.password,
          callbackUrl: '/dashboard'
        });
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data.error) {
        if (error.response.data.error === 'Name is required.') {
          form.setError('name', {
            type: 'manual',
            message: error.response.data.error
          });
        } else if (error.response.data.error === 'Email is required.') {
          form.setError('email', {
            type: 'manual',
            message: error.response.data.error
          });
        } else if (error.response.data.error === 'Password is required.') {
          form.setError('password', {
            type: 'manual',
            message: error.response.data.error
          });
        } else if (error.response.data.error === 'Passwords does not match.') {
          form.setError('confirm', {
            type: 'manual',
            message: error.response.data.error
          });
        } else if (error.response.data.error === 'Cannot register.') {
          toast({
            variant: 'destructive',
            title: 'Uh oh! Sorry.',
            description: 'Cannot register. There can only be one user.'
          });
        } else {
          toast({
            variant: 'destructive',
            title: 'Uh oh! Something went wrong.',
            description: error.response.data.error
          });
        }
      } else {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: 'There was a problem with your request.'
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className='w-full max-w-md'>
      <CardHeader>
        <CardTitle className='text-2xl'>Sign up</CardTitle>
        <CardDescription>to continue to Dashboard</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex flex-col gap-4 -mt-1'
          >
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      type='text'
                      placeholder='John Doe'
                      autoComplete='name'
                      {...field}
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
                <FormItem className='space-y-1'>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type='email'
                      placeholder='email@example.com'
                      autoComplete='email'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type='password' placeholder='••••••••' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='confirm'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type='password' placeholder='••••••••' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              disabled={loading}
              type='submit'
              variant='default'
              size='lg'
              className='mt-4'
            >
              {loading && (
                <>
                  <Loader2 className='animate-spin mr-2' size={18} />
                  Signing in...
                </>
              )}
              {!loading && <>Sign up</>}
            </Button>
            <p className='text-sm font-light text-gray-500 dark:text-gray-400 mt-1'>
              Already have an account?
              <Button variant='link' className='ml-1 px-0' asChild>
                <Link href='/auth/sign-in' title='Sign in'>
                  Sign in
                </Link>
              </Button>
            </p>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
