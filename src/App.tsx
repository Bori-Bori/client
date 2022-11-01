import React from 'react';
import Router from './router/Router';
import { ThemeProvider } from 'styled-components';
import DefaultTheme from './styles/Theme';
import GlobalStyle from './styles/GlobalStyle';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={DefaultTheme}>
          <GlobalStyle />
          <Router />
        </ThemeProvider>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default App;
