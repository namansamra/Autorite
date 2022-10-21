import React from 'react';
import { Alert, AlertIcon } from '@chakra-ui/react';

interface Props {
  type: 'error' | 'success' | 'warning' | 'info';
  message: string;
  showIcon?: boolean;
}
const AlertCustom = ({ type, message = '', showIcon = true, ...rest }: Props) => {
  return (
    <Alert status={type} {...rest}>
      {showIcon && <AlertIcon />}
      {message}
    </Alert>
  );
};

export default AlertCustom;
