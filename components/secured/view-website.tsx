import Link from 'next/link';
import { PanelTop } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';

interface ViewWebsiteProps {
  newTab?: boolean;
}

export default function ViewWebsite({ newTab = false }: ViewWebsiteProps) {
  return (
    <TooltipProvider disableHoverableContent>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <Button
            variant='outline'
            size='icon'
            className='h-8 w-8 rounded-full bg-background'
            asChild
          >
            <Link
              href='/'
              scroll={false}
              target={`${!newTab ? '_blank' : '_self'}`}
              rel='noopener noreferer'
            >
              <PanelTop className='w-5 h-5' />
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent side='bottom'>View Website</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
