import React from 'react';
import Router from './router/Router';
import { ThemeProvider } from 'styled-components';
import DefaultTheme from './styles/Theme';
import GlobalStyle from './styles/GlobalStyle';

import { RecoilRoot } from 'recoil';
import { AuthContextProvider } from 'context/AuthContext';

function App() {
  return (
    <ThemeProvider theme={DefaultTheme}>
      <GlobalStyle />
      <RecoilRoot>
        <AuthContextProvider>
          <Router />
        </AuthContextProvider>
      </RecoilRoot>
    </ThemeProvider>
  );
}

export default App;
