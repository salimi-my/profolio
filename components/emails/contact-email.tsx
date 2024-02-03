import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Tailwind,
  Text
} from '@react-email/components';

interface ContactEmailProps {
  email: string;
  name: string;
  message: string;
}

export default function ContactEmail({
  email,
  name,
  message
}: ContactEmailProps) {
  return (
    <Html>
      <Head>
        <title>New Message from Contact Form</title>
      </Head>
      <Preview>{message}</Preview>
      <Tailwind>
        <Body className='bg-white my-auto mx-auto font-sans'>
          <Container className='border border-solid border-zinc-200 rounded-lg my-10 mx-auto p-5 max-w-[500px]'>
            <Heading as='h1' className='text-black font-bold text-xl mb-6'>
              New Message from Contact Form
            </Heading>
            <Text className='text-black text-sm'>
              <p className='text-base font-semibold'>Hi Salimi,</p>
            </Text>
            <Text className='text-black text-sm'>
              You got a new message from {name}. Check it below:
            </Text>
            <Section className='w-full border rounded-md bg-zinc-100 px-4 py-1'>
              <Text className='text-zinc-700 text-sm my-2'>
                <span className='font-medium'>Name:</span> {name}
              </Text>
              <Text className='text-zinc-700 text-sm my-2'>
                <span className='font-medium'>Email:</span> {email}
              </Text>
              <Text className='text-zinc-700 text-sm my-2'>
                <span className='font-medium'>Message:</span> {message}
              </Text>
            </Section>
            <Hr className='border-0 border-t border-solid border-zinc-200 my-6 mx-0 w-full' />
            <Text className='text-zinc-500 text-xs'>
              This email was sent from Contact Form on your website.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
