'use client';

import * as z from 'zod';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import axios, { AxiosError } from 'axios';
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
    id: true;
    name: true;
    email: true;
  };
}>;

interface ProfileFormProps {
  user: User | null;
}

const formSchema = z.object({
  name: z.string().min(1, { message: 'Please enter name.' }),
  email: z.string().email({ message: 'Please enter valid email address.' })
});

export default function ProfileForm({ user }: ProfileFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const { update } = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user !== null && typeof user.name === 'string' ? user.name : '',
      email: user !== null && typeof user.email === 'string' ? user.email : ''
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      const response = await axios.post('/api/account/profile', values);

      if (response.data.success) {
        update({
          name: response.data.user.name,
          email: response.data.user.email
        });

        router.refresh();

        toast({
          variant: 'default',
          title: 'Success!',
          description: 'Data has been successfully saved.'
        });
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data.error) {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: error.response.data.error
        });
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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-4'
      >
        <FormItem className='space-y-1'>
          <FormLabel>ID</FormLabel>
          <FormControl>
            <Input placeholder='Enter your ID' value={user?.id} readOnly />
          </FormControl>
        </FormItem>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem className='space-y-1'>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder='Enter your name'
                  {...field}
                  autoComplete='name'
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
                  placeholder='Enter your email address'
                  {...field}
                  autoComplete='email'
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
