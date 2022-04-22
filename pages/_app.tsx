import type { AppProps } from 'next/app';
import Layout from 'components/Layout/Layout';
import { GlobalStyles } from '@mui/material';
import { QueryClient, QueryClientProvider } from 'react-query';
import ThemeContextProvider from '../contexts/ThemeContextProvider';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import { globalStyles } from 'styles/globalStyles';

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: AppProps) => {
  const xd = 'xd';

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContextProvider>
        <GlobalStyles styles={globalStyles} />
        <Layout>
          <ErrorBoundary>
            <Component {...pageProps} />
          </ErrorBoundary>
        </Layout>
      </ThemeContextProvider>
    </QueryClientProvider>
  );
};

export default MyApp;
