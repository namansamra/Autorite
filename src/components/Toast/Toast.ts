import { createStandaloneToast, theme } from '@chakra-ui/react';
const { toast } = createStandaloneToast({ theme });

interface Props {
  title: string;
  description?: string;
  status?: 'info' | 'warning' | 'success' | 'error' | 'loading';
  variant?: 'solid' | 'subtle' | 'left-accent' | 'top-accent';
  duration?: number;
  position?:
    | 'top'
    | 'top-right'
    | 'top-left'
    | 'bottom'
    | 'bottom-right'
    | 'bottom-left';
}

function CustomToast({
  title,
  description = '',
  status = 'success',
  duration = 5000,
  position = 'top-right',
}: Props) {
  toast.closeAll();
  toast({
    title,
    description,
    status,
    duration,
    position,
    isClosable: true,
  });
}

export default CustomToast;
