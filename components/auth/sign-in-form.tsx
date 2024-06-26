'use client';

import * as z from 'zod';
import Link from 'next/link';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';

import { LoginSchema } from '@/schemas';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DEFAULT_SIGNIN_REDIRECT } from '@/routes';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';

export default function SignInForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const [loading, setLoading] = useState(false);

  let error = searchParams.get('error');

  if (error === 'CredentialsSignin') {
    error = 'Invalid email or password.';
  }

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    try {
      setLoading(true);

      await signIn('credentials', {
        ...values,
        callbackUrl: callbackUrl || DEFAULT_SIGNIN_REDIRECT
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Card className='w-full max-w-md'>
        <CardHeader>
          <CardTitle className='text-2xl'>Sign in</CardTitle>
          <CardDescription>to continue to Dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant='destructive' className='mb-6'>
              <AlertTitle className='flex items-center gap-2'>
                <AlertTriangle className='h-4 w-4' />
                Error
              </AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='flex flex-col gap-4 -mt-1'
            >
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem className='space-y-1'>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
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
                      <Input
                        type='password'
                        placeholder='••••••••'
                        {...field}
                      />
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
                {!loading && <>Sign in</>}
              </Button>
              <p className='text-sm font-light text-gray-500 dark:text-gray-400 mt-1'>
                Don&apos;t have an account yet?
                <Button variant='link' className='ml-1 px-0' asChild>
                  <Link href='/auth/sign-up' title='Sign up'>
                    Sign up
                  </Link>
                </Button>
              </p>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
