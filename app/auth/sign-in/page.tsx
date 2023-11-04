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

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter valid email address.' }),
  password: z.string().min(1, { message: 'Please enter password.' })
});

export default function SignInPage() {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = () => {};

  return (
    <Card className='w-full max-w-md'>
      <CardHeader>
        <CardTitle className='text-2xl'>Sign in</CardTitle>
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
              name='email'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='email@example.com' {...field} />
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
              {!loading && <>Sign in</>}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
