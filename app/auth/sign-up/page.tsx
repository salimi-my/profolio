'use client';

import * as z from 'zod';
import axios from 'axios';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

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

const formSchema = z
  .object({
    name: z.string().min(1, { message: 'Please enter name.' }),
    email: z.string().email({ message: 'Please enter valid email address.' }),
    password: z
      .string()
      .min(8, { message: 'Please enter at least 8 characters.' }),
    confirm: z
      .string()
      .min(8, { message: 'Please enter at least 8 characters.' })
  })
  .refine((data) => data.password === data.confirm, {
    message: 'Passwords does not match.',
    path: ['confirm']
  });

export default function SignUpPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirm: ''
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
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
      }
    } catch (error: any) {
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
      } else if (error.response.data.error === 'Email is already taken.') {
        toast({
          variant: 'destructive',
          title: 'Email already taken.',
          description: 'Please use other email address.'
        });
      } else {
        console.log(error);
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
                    <Input type='text' placeholder='John Doe' {...field} />
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
              className='mt-2'
            >
              {loading && (
                <>
                  <Loader2 className='animate-spin mr-2' size={18} />
                  Signing in...
                </>
              )}
              {!loading && <>Sign up</>}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
