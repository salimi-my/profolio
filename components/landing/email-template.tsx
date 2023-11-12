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

interface EmailTemplateProps {
  email: string;
  name: string;
  message: string;
}

export default function EmailTemplate({
  email,
  name,
  message
}: EmailTemplateProps) {
  return (
    <Html>
      <Head>
        <title>New Message from Contact Form</title>
      </Head>
      <Preview>{message}</Preview>
      <Tailwind>
        <Body className='bg-white my-auto mx-auto'>
          <Container className='border border-solid border-[#eaeaea] rounded-lg my-[40px] mx-auto p-[20px] w-[500px]'>
            <Heading className='text-black text-[24px] font-normal text-start p-0 my-[30px] mx-0'>
              New <strong>Message</strong> from <strong>Contact Form</strong>
            </Heading>
            <Text className='text-black text-[14px] leading-[24px]'>
              <p className='text-base font-semibold'>Hi Salimi,</p>
            </Text>
            <Text className='text-black text-[14px] leading-[24px]'>
              You got a new message from {name}. Check it below:
            </Text>
            <Section className='w-full border rounded-md bg-zinc-100 px-4'>
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
            <Hr className='border border-solid border-[#eaeaea] my-[26px] mx-0 w-full' />
            <Text className='text-[#666666] text-[12px] leading-[24px]'>
              This email was sent from Contact Form on your website.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
