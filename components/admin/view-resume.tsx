'use client';

interface ViewResumeProps {
  url: string | null;
}

export default function ViewResume({ url }: ViewResumeProps) {
  return (
    <>
      {!url && (
        <div className='w-full h-[500px] flex justify-center items-center p-9 border rounded-md'>
          <p className='text-center font-medium'>No resume found.</p>
        </div>
      )}
      {url && (
        <>
          <object
            data={url}
            type='application/pdf'
            width='100%'
            height='100%'
            className='w-full h-[1000px] rounded-md'
          >
            <iframe
              src={url}
              width='100%'
              height='100%'
              className='w-full h-[1000px]'
            >
              Your browser does not support PDF.
            </iframe>
          </object>
        </>
      )}
    </>
  );
}
