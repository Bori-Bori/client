import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Main from '../pages/Main';
import Detail from '../pages/Detail/index';
import KakaoOauth from '../pages/Login/KakaoLogin';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/detail" element={<Detail />} />
      <Route path="/login/kakao/oauth" element={<KakaoOauth />} />
    </Routes>
  );
}
export default Router;
