'use client';

import * as z from 'zod';
import { useState } from 'react';
import { Prisma } from '@prisma/client';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { Loader2, Trash } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';

import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { useEdgeStore } from '@/lib/edgestore';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { SingleImageDropzone } from '@/components/admin/single-image-dropzone';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';

type PortfolioWithTags = Prisma.PortfolioGetPayload<{
  include: { tags: true };
}>;

interface PortfolioFormProps {
  portfolio?: PortfolioWithTags | null;
}

const formSchema = z.object({
  image: z.string(),
  thumbnail: z.string(),
  title: z.string().min(1, { message: 'Please enter title.' }),
  description: z.string().min(1, { message: 'Please enter description.' }),
  githubUrl: z.string().min(1, { message: 'Please enter GitHub URL.' }),
  demoUrl: z.string().min(1, { message: 'Please enter demo URL.' }),
  tags: z
    .array(
      z.object({
        name: z.string().min(1, { message: 'Please enter tag.' })
      })
    )
    .optional()
});

export default function PortfolioForm({ portfolio }: PortfolioFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [file, setFile] = useState<File | string | undefined>(
    portfolio?.image ?? undefined
  );
  const [loading, setLoading] = useState(false);

  const { edgestore } = useEdgeStore();

  const initialValues =
    portfolio?.tags !== undefined && portfolio?.tags.length > 0
      ? portfolio?.tags.map((item) => ({
          name: item.name
        }))
      : [{ name: '' }];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: portfolio?.image ?? '',
      thumbnail: portfolio?.thumbnail ?? '',
      title: portfolio?.title ?? '',
      description: portfolio?.description ?? '',
      githubUrl: portfolio?.githubUrl ?? '',
      demoUrl: portfolio?.demoUrl ?? '',
      tags: initialValues
    },
    mode: 'onChange'
  });

  const { fields, append, remove } = useFieldArray({
    name: 'tags',
    control: form.control
  });

  const {
    formState: { errors }
  } = form;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      let imageURL = portfolio?.image ?? '';
      let thumbnailURL = portfolio?.thumbnail ?? '';
      if (file && file instanceof File) {
        const res = await edgestore.publicImages.upload({
          file,
          options: {
            replaceTargetUrl: portfolio?.image ?? undefined
          }
        });

        if (res.url && res.thumbnailUrl) {
          imageURL = res.url;
          thumbnailURL = res.thumbnailUrl;
        }
      }

      const newValues = { ...values, image: imageURL, thumbnail: thumbnailURL };

      if (portfolio) {
        const response = await axios.patch(
          `/api/portfolio/${portfolio.id}`,
          newValues
        );

        if (response.data.success) {
          toast({
            variant: 'default',
            title: 'Success!',
            description: 'Data has been successfully saved.'
          });
          router.push(`/portfolio/${response.data.portfolio.id}/edit`);
        }
      } else {
        const response = await axios.post('/api/portfolio', newValues);

        if (response.data.success) {
          toast({
            variant: 'default',
            title: 'Success!',
            description: 'Data has been successfully saved.'
          });
          router.push(`/portfolio/${response.data.portfolio.id}/edit`);
        }
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
        className='grid lg:grid-cols-2 gap-8'
      >
        <div className='flex flex-col gap-4'>
          <FormLabel htmlFor='image-file'>Image</FormLabel>
          <SingleImageDropzone
            className='w-full h-full'
            value={file}
            dropzoneOptions={{
              maxSize: 1024 * 1024 * 2 // 2MB
            }}
            onChange={(file) => {
              setFile(file);
            }}
          />
        </div>
        <div className='flex flex-col gap-4'>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder='Enter title' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    rows={5}
                    placeholder='Enter description'
                    className='resize-none'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='githubUrl'
            render={({ field }) => (
              <FormItem>
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
            name='demoUrl'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Demo URL</FormLabel>
                <FormControl>
                  <Input placeholder='Enter demo URL' {...field} />
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
                    name={`tags.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={cn(index !== 0 && 'sr-only')}>
                          Tags
                        </FormLabel>
                        <FormDescription
                          className={cn(index !== 0 && 'sr-only')}
                        >
                          Add list of techs used in this this project.
                        </FormDescription>
                        <FormControl>
                          <Input placeholder='Enter tag' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div
                  className={cn(
                    'grow-0',
                    !!errors.tags?.at?.(index) && 'self-end mb-[1.7rem]'
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
                Add tag
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
        </div>
      </form>
    </Form>
  );
}
