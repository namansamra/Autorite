import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  components: {
    Button: {
      variants: {
        primary: {
          bg: '#40cdc0',
          fontSize: '14px',
          color: 'white',
          padding: '12px 16px',
        },
        secondary: {
          bg: 'white',
          color: '#475467',
          fontSize: '14px',
          padding: '12px 16px',
          border: '1px solid #E4E7EC',
        },
      },
    },
  },
});

export default theme;
