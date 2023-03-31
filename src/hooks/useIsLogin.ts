import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { useAuthContext } from '../context/useAuthContext';

import { isLoginAtom } from '../recoil/profile';

const useIsLogin = () => {
  const { user }: any = useAuthContext();
  const setIsLogin = useSetRecoilState(isLoginAtom);

  useEffect(() => {
    if (user) {
      setIsLogin(true);
      return;
    }
    setIsLogin(false);
  }, []);
};

export default useIsLogin;
