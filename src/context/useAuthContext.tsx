import { useContext } from 'react';
import { AuthContext } from './AuthContext';

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  return context; // state와 dispatch함수가 들어있습니다.
};
