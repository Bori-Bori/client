import React, { ReactNode } from 'react';
import { useRecoilValue } from 'recoil';

import Login from '../pages/Login/index';
import EditProfileModal from '../pages/Mypage/components/EditProfileModal';
import showLoginModal from '../recoil/showLoginModal';
import showEditProfileModal from '../recoil/showEditProfileModal';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const showMoadal = useRecoilValue(showLoginModal);
  const showProfileModal = useRecoilValue(showEditProfileModal);
  return (
    <div>
      {showMoadal && <Login />}
      {showProfileModal && <EditProfileModal />}
      {children}
    </div>
  );
};

export default Layout;
