'use client';

import * as z from 'zod';
import axios from 'axios';
import { useState } from 'react';
import { Prisma } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { Loader2, Trash } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';

import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
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

type MiscellaneousWithTitles = Prisma.MiscellaneousGetPayload<{
  include: { titles: true };
}>;

interface MiscellaneousFormProps {
  miscellaneous: MiscellaneousWithTitles | null;
}

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter valid email address.' }),
  messengerName: z.string().min(1, { message: 'Please enter Messenger name.' }),
  messengerUrl: z
    .string()
    .url({ message: 'Please enter valid Messenger URL.' }),
  discordUsername: z
    .string()
    .min(1, { message: 'Please enter Discord username.' }),
  discordUrl: z.string().url({ message: 'Please enter valid Discord URL.' }),
  facebookUrl: z.string().url({ message: 'Please enter valid Facebook URL.' }),
  instagramUrl: z
    .string()
    .url({ message: 'Please enter valid Instagram URL.' }),
  twitterUrl: z.string().url({ message: 'Please enter valid Twitter URL.' }),
  linkedinUrl: z.string().url({ message: 'Please enter valid LinkedIn URL.' }),
  githubUrl: z.string().url({ message: 'Please enter valid GitHub URL.' }),
  csvUrl: z.string().url({ message: 'Please enter valid CSV URL.' }),
  titles: z
    .array(
      z.object({
        name: z.string().min(1, { message: 'Please enter title.' })
      })
    )
    .optional()
});

export default function MiscellaneousForm({
  miscellaneous
}: MiscellaneousFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const initialValues =
    miscellaneous?.titles !== undefined && miscellaneous?.titles.length > 0
      ? miscellaneous?.titles.map((item) => ({
          name: item.name
        }))
      : [{ name: '' }];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: miscellaneous?.email ?? '',
      messengerName: miscellaneous?.messengerName ?? '',
      messengerUrl: miscellaneous?.messengerUrl ?? '',
      discordUsername: miscellaneous?.discordUsername ?? '',
      discordUrl: miscellaneous?.discordUrl ?? '',
      facebookUrl: miscellaneous?.facebookUrl ?? '',
      instagramUrl: miscellaneous?.instagramUrl ?? '',
      twitterUrl: miscellaneous?.twitterUrl ?? '',
      linkedinUrl: miscellaneous?.linkedinUrl ?? '',
      githubUrl: miscellaneous?.githubUrl ?? '',
      csvUrl: miscellaneous?.csvUrl ?? '',
      titles: initialValues
    },
    mode: 'onChange'
  });

  const { fields, append, remove } = useFieldArray({
    name: 'titles',
    control: form.control
  });

  const {
    formState: { errors }
  } = form;

  const onSubmit = () => {};

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-4'
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem className='space-y-1'>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='Enter email' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='messengerName'
          render={({ field }) => (
            <FormItem className='space-y-1'>
              <FormLabel>Messenger Name</FormLabel>
              <FormControl>
                <Input placeholder='Enter Messenger name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='messengerUrl'
          render={({ field }) => (
            <FormItem className='space-y-1'>
              <FormLabel>Messenger URL</FormLabel>
              <FormControl>
                <Input placeholder='Enter Messenger URL' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='discordUsername'
          render={({ field }) => (
            <FormItem className='space-y-1'>
              <FormLabel>Discord Username</FormLabel>
              <FormControl>
                <Input placeholder='Enter Discord username' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='discordUrl'
          render={({ field }) => (
            <FormItem className='space-y-1'>
              <FormLabel>Discord URL</FormLabel>
              <FormControl>
                <Input placeholder='Enter Discord URL' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='facebookUrl'
          render={({ field }) => (
            <FormItem className='space-y-1'>
              <FormLabel>Facebook URL</FormLabel>
              <FormControl>
                <Input placeholder='Enter Facebook URL' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='instagramUrl'
          render={({ field }) => (
            <FormItem className='space-y-1'>
              <FormLabel>Instagram URL</FormLabel>
              <FormControl>
                <Input placeholder='Enter Instagram URL' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='twitterUrl'
          render={({ field }) => (
            <FormItem className='space-y-1'>
              <FormLabel>Twitter URL</FormLabel>
              <FormControl>
                <Input placeholder='Enter Twitter URL' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='linkedinUrl'
          render={({ field }) => (
            <FormItem className='space-y-1'>
              <FormLabel>LinkedIn URL</FormLabel>
              <FormControl>
                <Input placeholder='Enter LinkedIn URL' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='githubUrl'
          render={({ field }) => (
            <FormItem className='space-y-1'>
              <FormLabel>GitHub URL</FormLabel>
              <FormControl>
                <Input placeholder='Enter GitHub URL' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='csvUrl'
          render={({ field }) => (
            <FormItem className='space-y-1'>
              <FormLabel>CSV URL</FormLabel>
              <FormControl>
                <Input placeholder='Enter CSV URL' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          {fields.map((field, index) => (
            <div
              key={field.id}
              className='flex items-end gap-2 sm:gap-3 justify-between'
            >
              <div className='grow'>
                <FormField
                  control={form.control}
                  name={`titles.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={cn(index !== 0 && 'sr-only')}>
                        Titles
                      </FormLabel>
                      <FormDescription className={cn(index !== 0 && 'sr-only')}>
                        Add titles for typewriter animations on header.
                      </FormDescription>
                      <FormControl>
                        <Input placeholder='Enter title' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div
                className={cn(
                  'grow-0',
                  !!errors.titles?.at?.(index) && 'self-end mb-[1.7rem]'
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
              onClick={() => append({ name: '' })}
            >
              Add title
            </Button>
          </div>
        </div>
        <div>
          <Button
            disabled={loading}
            type='submit'
            variant='default'
            className='mt-4'
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
