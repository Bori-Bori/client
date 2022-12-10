import React from 'react';
import Router from './router/Router';
import { ThemeProvider } from 'styled-components';
import DefaultTheme from './styles/Theme';
import GlobalStyle from './styles/GlobalStyle';
import Layout from './components/layout';

import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  const queryClient = new QueryClient();
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={DefaultTheme}>
          <GlobalStyle />
          <Layout>
            <Router />
          </Layout>
        </ThemeProvider>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default App;
