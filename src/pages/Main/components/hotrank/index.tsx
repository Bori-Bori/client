import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { countState, hoverState } from './../../../../recoil/slide';
import Tablet from './tablet';
import Mobile from './mobile';
import Slide from './Slide';
const Home = () => {
  const [count, setCount] = useRecoilState(countState);
  const hover = useRecoilValue(hoverState);
  useEffect(() => {
    if (hover) {
      const id = setInterval(() => {
        setCount((count) => count + 1);
        if (count === 9) {
          clearInterval(id);
          setCount(0);
        }
      }, 2000);
      return () => clearInterval(id);
    }
    return;
  }, [count, hover]);

  return (
    <>
      <Slide />
      <Tablet />
      <Mobile />
    </>
  );
};

export default Home;
