'use client';

import * as z from 'zod';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import axios, { AxiosError } from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircledIcon } from '@radix-ui/react-icons';

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

interface DownloadCvFormProps {
  onClose: () => void;
}

const formSchema = z.object({
  name: z.string().min(1, { message: 'Please enter name.' }),
  email: z.string().email({ message: 'Please enter valid email address.' }),
  company: z.optional(z.string())
});

export default function DownloadCvForm({ onClose }: DownloadCvFormProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      company: ''
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      const response = await axios.post('/api/resume/generate-link', values);

      if (response.data.success) {
        form.reset();

        setSuccess(true);
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
                  disabled={loading}
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
                  disabled={loading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='company'
          render={({ field }) => (
            <FormItem className='space-y-1'>
              <FormLabel>Company (optional)</FormLabel>
              <FormControl>
                <Input
                  placeholder='Enter your company name'
                  {...field}
                  autoComplete='company'
                  disabled={loading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {success && (
          <div className='bg-emerald-500/15 dark:bg-emerald-500/30 p-3 rounded-md flex items-center space-x-2 text-xs md:text-sm text-emerald-500 dark:text-emerald-300 mt-4'>
            <div className='w-5 h-5'>
              <CheckCircledIcon className='h-5 w-5' />
            </div>
            <p>
              Download link successfully generated and sent to your email.
              Please check your email and click on the link to proceed.
            </p>
          </div>
        )}

        <div className='pt-3 space-x-2 flex items-center justify-end w-full'>
          <Button
            type='button'
            disabled={loading}
            variant='outline'
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button disabled={loading} type='submit' variant='default'>
            {loading && (
              <>
                <Loader2 className='animate-spin mr-2' size={18} />
                Generating...
              </>
            )}
            {!loading && <>Generate Link</>}
          </Button>
        </div>
      </form>
    </Form>
  );
}
