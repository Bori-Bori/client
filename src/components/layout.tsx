import React, { ReactNode } from 'react';
import { useRecoilValue } from 'recoil';

import Login from '../pages/Login/index';
import showLoginModal from '../recoil/showLoginModal';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const showMoadal = useRecoilValue(showLoginModal);
  return (
    <div>
      {showMoadal && <Login />}
      {children}
    </div>
  );
};

export default Layout;
