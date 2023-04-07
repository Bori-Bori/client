import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { isLoginAtom } from '../recoil/profile';

const useIsLogin = () => {
  const user = JSON.parse(localStorage.getItem('user')!);

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
