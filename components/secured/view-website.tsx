import Link from 'next/link';
import { PanelTop } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';

export default function ViewWebsite() {
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
            <Link href='/' target='_blank' rel='noopener noreferer'>
              <PanelTop className='w-5 h-5' />
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent side='bottom'>View Website</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
