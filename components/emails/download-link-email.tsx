import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Tailwind,
  Text
} from '@react-email/components';

const baseUrl = process.env.AUTH_URL;

interface DownloadLinkEmailProps {
  name: string;
  downloadToken: string;
}

export default function DownloadLinkEmail({
  name,
  downloadToken
}: DownloadLinkEmailProps) {
  return (
    <Html>
      <Head>
        <title>CV Download Link</title>
      </Head>
      <Preview>
        You requested a CV download link from Salimi. Check it out.
      </Preview>
      <Tailwind>
        <Body className='bg-white my-auto mx-auto font-sans'>
          <Container className='border border-solid border-zinc-200 rounded-lg my-10 mx-auto p-5 max-w-[500px]'>
            <Heading as='h1' className='text-black font-bold text-xl mb-6'>
              Salimi&apos;s CV Download Link
            </Heading>
            <Text className='text-black text-sm'>
              <p className='text-base font-semibold'>Hi {name},</p>
            </Text>
            <Text className='text-black text-sm'>
              Thank you for expressing interest in my profile. As requested, the
              download link for my CV will be valid for the next 10 minutes.
              Please click the button below to initiate the download.
            </Text>
            <Button
              href={`${baseUrl}/download-cv?token=${downloadToken}`}
              className='text-sm font-semibold bg-gray-900 rounded-md text-white py-2 px-6 my-2'
            >
              Download CV
            </Button>
            <Hr className='border-0 border-t border-solid border-zinc-200 my-6 mx-0 w-full' />
            <Text className='text-zinc-500 text-xs'>
              This email was automatically sent from{' '}
              <Link
                href={baseUrl}
                className='underline text-gray-500 underline-offset-2'
              >
                Salimi
              </Link>
              &apos;s website.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
