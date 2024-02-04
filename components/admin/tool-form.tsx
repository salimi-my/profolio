'use client';

import * as z from 'zod';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import axios, { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

import type { Tool } from '@prisma/client';
import { Input } from '@/components/ui/input';
import { useEdgeStore } from '@/lib/edgestore';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { SingleImageDropzone } from '@/components/admin/single-image-dropzone';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

interface ToolFormProps {
  tool?: Tool | null;
}

const formSchema = z.object({
  image: z.string(),
  thumbnail: z.string(),
  name: z.string().min(1, { message: 'Please enter name.' }),
  color: z.string().min(1, { message: 'Please select color.' })
});

export default function ToolForm({ tool }: ToolFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [file, setFile] = useState<File | string | undefined>(
    tool?.image ?? undefined
  );
  const [loading, setLoading] = useState(false);

  const { edgestore } = useEdgeStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: tool?.image ?? '',
      thumbnail: tool?.thumbnail ?? '',
      name: tool?.name ?? '',
      color: tool?.color ?? ''
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      let imageURL = tool?.image ?? '';
      let thumbnailURL = tool?.thumbnail ?? '';
      if (file && file instanceof File) {
        const res = await edgestore.publicImages.upload({
          file,
          options: {
            replaceTargetUrl: tool?.image ?? undefined
          }
        });

        if (res.url && res.thumbnailUrl) {
          imageURL = res.url;
          thumbnailURL = res.thumbnailUrl;
        }
      }

      const newValues = { ...values, image: imageURL, thumbnail: thumbnailURL };

      if (tool) {
        const response = await axios.patch(`/api/tool/${tool.id}`, newValues);

        if (response.data.success) {
          toast({
            variant: 'default',
            title: 'Success!',
            description: 'Data has been successfully saved.'
          });
          router.push(response.data.tool.id);
        }
      } else {
        const response = await axios.post('/api/tool', newValues);

        if (response.data.success) {
          toast({
            variant: 'default',
            title: 'Success!',
            description: 'Data has been successfully saved.'
          });
          router.push(response.data.tool.id);
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
        className='flex flex-col gap-4'
      >
        <div className='flex flex-col gap-4'>
          <FormLabel htmlFor='image-file'>Image</FormLabel>
          <SingleImageDropzone
            width={200}
            height={200}
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
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder='Enter name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='color'
            render={({ field }) => (
              <FormItem className='space-y-1'>
                <FormLabel>Color</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  name={field.name}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select color' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='LIGHT'>Light</SelectItem>
                    <SelectItem value='DARK'>Dark</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
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
