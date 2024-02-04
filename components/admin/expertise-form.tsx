'use client';

import * as z from 'zod';
import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { Loader2, Trash } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';

import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { Expertise } from '@prisma/client';
import { useToast } from '@/components/ui/use-toast';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';

interface ExpertiseFormProps {
  expertiseType: string;
  expertiseItems: Expertise[];
}

const formSchema = z.object({
  items: z.array(
    z.object({
      service: z.string().min(1, { message: 'Please enter service.' }),
      type: z.string().min(1, { message: 'Please enter type.' })
    })
  )
});

export default function ExpertiseForm({
  expertiseType,
  expertiseItems
}: ExpertiseFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const initialValues =
    expertiseItems.length > 0
      ? expertiseItems.map((item) => ({
          service: item.service,
          type: item.type
        }))
      : [
          {
            service: '',
            type: expertiseType
          }
        ];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      items: initialValues
    },
    mode: 'onChange'
  });

  const { fields, append, remove } = useFieldArray({
    name: 'items',
    control: form.control
  });

  const {
    formState: { errors }
  } = form;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      const response = await axios.post('/api/expertise', values);

      if (response.data.success) {
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
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col'>
        {fields.map((field, index) => (
          <div
            key={field.id}
            className='flex items-end gap-2 sm:gap-3 justify-between'
          >
            <div className='grow'>
              <FormField
                control={form.control}
                name={`items.${index}.service`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={cn(index !== 0 && 'sr-only')}>
                      Service
                    </FormLabel>
                    <FormDescription className={cn(index !== 0 && 'sr-only')}>
                      Add list services and expertises you offer.
                    </FormDescription>
                    <FormControl>
                      <Input placeholder='Enter service' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`items.${index}.type`}
                render={({ field }) => (
                  <FormItem className='hidden'>
                    <FormControl>
                      <Input type='hidden' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div
              className={cn(
                'grow-0',
                !!errors.items?.at?.(index) && 'self-end mb-[1.7rem]'
              )}
            >
              <Button
                onClick={() => remove(index)}
                variant='outline'
                size='icon'
              >
                <Trash className='w-4 h-4' />
              </Button>
            </div>
          </div>
        ))}
        <div>
          <Button
            type='button'
            variant='outline'
            size='sm'
            className='mt-2'
            onClick={() => append({ service: '', type: expertiseType })}
          >
            Add service
          </Button>
        </div>
        <div>
          <Button
            disabled={loading}
            type='submit'
            variant='default'
            className='mt-6'
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
