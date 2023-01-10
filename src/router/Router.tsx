import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Main from '../pages/Main';
import Detail from '../pages/Detail/index';
import KakaoOauth from '../pages/Login/KakaoLogin';
import Header from '../components/Header';

function Router() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<Header />} />
      </Routes>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/login/kakao/oauth" element={<KakaoOauth />} />
      </Routes>
    </>
  );
}
export default Router;
