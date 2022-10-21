import { ChakraProvider } from '@chakra-ui/react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import ReactDOM from 'react-dom/client';
import App from './App';
import ChakraTheme from '@/theme/chakratheme';
import './index.css';

const emotionCache = createCache({
  key: 'emotion-css-cache',
  prepend: true, // ensures styles are prepended to the <head>, instead of appended
});
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <CacheProvider value={emotionCache}>
    <ChakraProvider theme={ChakraTheme}>
      <App />
    </ChakraProvider>
  </CacheProvider>
);
