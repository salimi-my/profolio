'use client';

import * as z from 'zod';
import axios from 'axios';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import type { Prisma } from '@prisma/client';
import { useSession } from 'next-auth/react';
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

type User = Prisma.UserGetPayload<{
  select: {
    name: true;
    email: true;
  };
}>;

interface AccountFormProps {
  user: User | null;
}

const formSchema = z
  .object({
    name: z.string().min(1, { message: 'Please enter name.' }),
    email: z.string().email({ message: 'Please enter valid email address.' }),
    current: z
      .string()
      .min(8, { message: 'Please enter at least 8 characters.' }),
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

export default function AccountForm({ user }: AccountFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const { update } = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user !== null && typeof user.name === 'string' ? user.name : '',
      email: user !== null && typeof user.email === 'string' ? user.email : '',
      current: '',
      password: '',
      confirm: ''
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      const response = await axios.post('/api/account', values);

      if (response.data.success) {
        update({
          name: response.data.user.name,
          email: response.data.user.email
        });

        form.resetField('current');
        form.resetField('password');
        form.resetField('confirm');
        router.refresh();

        toast({
          variant: 'default',
          title: 'Success!',
          description: 'Data has been successfully saved.'
        });
      }
    } catch (error: any) {
      if (error.response.data.error === 'Passwords does not match.') {
        form.setError('confirm', {
          type: 'manual',
          message: error.response.data.error
        });
      } else if (error.response.data.error === 'Wrong current password.') {
        form.setError('current', {
          type: 'manual',
          message: error.response.data.error
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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-4'
      >
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem className='space-y-1'>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='Enter your name' {...field} />
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
                <Input placeholder='Enter your email address' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='current'
          render={({ field }) => (
            <FormItem className='space-y-1'>
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <Input
                  type='password'
                  placeholder='Enter current password'
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
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input
                  type='password'
                  placeholder='Enter new password'
                  {...field}
                />
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
                <Input
                  type='password'
                  placeholder='Enter confirm password'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <Button
            disabled={loading}
            type='submit'
            variant='default'
            className='mt-2'
          >
            {loading && (
              <>
                <Loader2 className='animate-spin mr-2' size={18} />
                Saving...
              </>
            )}
            {!loading && <p className='px-4'>Save</p>}
          </Button>
        </div>
      </form>
    </Form>
  );
}
