'use client';

import * as z from 'zod';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import axios, { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

import { Modal } from '@/components/ui/modal';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useQualificationModal } from '@/hooks/use-qualification-modal';
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

const formSchema = z
  .object({
    type: z.string().min(1, { message: 'Please select type.' }),
    degree: z.string(),
    school: z.string(),
    position: z.string(),
    company: z.string(),
    startYear: z.string().min(1, { message: 'Please enter start year.' }),
    endYear: z.string().min(1, { message: 'Please enter end year.' })
  })
  .superRefine((values, context) => {
    if (values.type === 'EDUCATION' && !values.degree) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please enter degree.',
        path: ['degree']
      });
    }

    if (values.type === 'EDUCATION' && !values.school) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please enter school.',
        path: ['school']
      });
    }

    if (values.type === 'EXPERIENCE' && !values.position) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please enter position.',
        path: ['position']
      });
    }

    if (values.type === 'EXPERIENCE' && !values.company) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please enter company.',
        path: ['company']
      });
    }
  });

export default function QualificationModal() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const qualificationModal = useQualificationModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: '',
      degree: '',
      school: '',
      position: '',
      company: '',
      startYear: '',
      endYear: ''
    },
    values: {
      type: qualificationModal.qualification?.type ?? '',
      degree: qualificationModal.qualification?.degree ?? '',
      school: qualificationModal.qualification?.school ?? '',
      position: qualificationModal.qualification?.position ?? '',
      company: qualificationModal.qualification?.company ?? '',
      startYear: qualificationModal.qualification?.startYear ?? '',
      endYear: qualificationModal.qualification?.endYear ?? ''
    }
  });

  const qualificationType = form.watch('type');

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      let response;

      if (qualificationModal.qualification?.id !== undefined) {
        response = await axios.patch(
          `/api/qualification/${qualificationModal.qualification?.id}`,
          values
        );
      } else {
        response = await axios.post('/api/qualification', values);
      }

      if (response.data.success) {
        form.reset();
        qualificationModal.onClose();
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
    <Modal
      title={qualificationModal.title}
      description={qualificationModal.description}
      isOpen={qualificationModal.isOpen}
      onClose={() => {
        qualificationModal.onClose();
        form.reset();
      }}
    >
      <div className='py-2 pb-4'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex flex-col gap-4'
          >
            <FormField
              control={form.control}
              name='type'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    name={field.name}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select type' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='EDUCATION'>Education</SelectItem>
                      <SelectItem value='EXPERIENCE'>Experience</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {qualificationType === 'EDUCATION' && (
              <div className='grid grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name='degree'
                  render={({ field }) => (
                    <FormItem className='space-y-1'>
                      <FormLabel>Degree</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder='Enter degree'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='school'
                  render={({ field }) => (
                    <FormItem className='space-y-1'>
                      <FormLabel>School</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder='Enter school'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            {qualificationType === 'EXPERIENCE' && (
              <div className='grid grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name='position'
                  render={({ field }) => (
                    <FormItem className='space-y-1'>
                      <FormLabel>Position</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder='Enter position'
                          {...field}
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
                      <FormLabel>Company</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder='Enter company'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            <div className='grid grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='startYear'
                render={({ field }) => (
                  <FormItem className='space-y-1'>
                    <FormLabel>Start Year</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder='Enter start year'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='endYear'
                render={({ field }) => (
                  <FormItem className='space-y-1'>
                    <FormLabel>End Year</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder='Enter end year'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='pt-6 space-x-2 flex items-center justify-end w-full'>
              <Button
                type='button'
                disabled={loading}
                variant='outline'
                onClick={() => {
                  qualificationModal.onClose();
                  form.reset();
                }}
              >
                Cancel
              </Button>
              <Button disabled={loading} type='submit'>
                {loading && (
                  <>
                    <Loader2 className='animate-spin mr-2' size={18} />
                    {!!qualificationModal.qualification ? (
                      <p>Updating...</p>
                    ) : (
                      <p>Creating...</p>
                    )}
                  </>
                )}
                {!loading && (
                  <>
                    {!!qualificationModal.qualification ? (
                      <p>Update</p>
                    ) : (
                      <p>Create</p>
                    )}
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
}
