'use client';

import * as z from 'zod';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Resume } from '@prisma/client';
import axios, { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/input';
import { useEdgeStore } from '@/lib/edgestore';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';

interface UploadPdfFormProps {
  onClose: () => void;
  resume: Resume | null;
}

const formSchema = z.object({
  pdf: z.string()
});

export default function UploadPdfForm({ onClose, resume }: UploadPdfFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [fileError, setFileError] = useState('');
  const [file, setFile] = useState<File | string | undefined>(
    resume?.pdf ?? undefined
  );

  const { edgestore } = useEdgeStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pdf: resume?.pdf ?? ''
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      let pdfURL = resume?.pdf ?? '';
      if (file && file instanceof File) {
        const res = await edgestore.publicFiles.upload({
          file,
          options: {
            replaceTargetUrl: resume?.pdf ?? undefined
          }
        });

        if (res.url) {
          pdfURL = res.url;
        }
      }

      if (pdfURL === '') {
        setFileError('Please select file.');
        return;
      }

      setFileError('');
      const newValues = { ...values, pdf: pdfURL };

      const response = await axios.post('/api/resume', newValues);

      if (response.data.success) {
        onClose();
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
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-4'>
          <FormItem>
            <FormLabel htmlFor='pdfFile'>PDF File</FormLabel>
            <FormControl>
              <Input
                id='pdfFile'
                type='file'
                disabled={loading}
                defaultValue={file instanceof File ? file.name : ''}
                onChange={(event) => {
                  const selectedFile = event.target.files?.[0];
                  if (selectedFile) {
                    if (
                      selectedFile.type !== 'application/pdf' &&
                      selectedFile.type !== 'application/x-pdf'
                    ) {
                      setFileError('Invalid file type.');
                      return;
                    }

                    if (selectedFile.size > 1024 * 1024 * 2) {
                      setFileError('File size is too large. Max size is 2MB.');
                      return;
                    }

                    setFileError('');
                    setFile(selectedFile);
                  }
                }}
              />
            </FormControl>
            <FormMessage>{fileError}</FormMessage>
          </FormItem>
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
