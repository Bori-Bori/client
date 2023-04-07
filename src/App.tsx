import React from 'react';
import Router from './router/Router';
import { ThemeProvider } from 'styled-components';
import DefaultTheme from './styles/Theme';
import GlobalStyle from './styles/GlobalStyle';

import { RecoilRoot } from 'recoil';

function App() {
  return (
    <ThemeProvider theme={DefaultTheme}>
      <GlobalStyle />
      <RecoilRoot>
        <Router />
      </RecoilRoot>
    </ThemeProvider>
  );
}

export default App;
