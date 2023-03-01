import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { isLoginAtom } from '../recoil/profile';

const useIsLogin = () => {
  const setIsLogin = useSetRecoilState(isLoginAtom);
  useEffect(() => {
    if (window.localStorage.getItem('user')) {
      setIsLogin(true);
      return;
    }
    setIsLogin(false);
  }, []);
};

export default useIsLogin;
