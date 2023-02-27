import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Main from '../pages/Main';
import Search from '../pages/Search';
import Detail from '../pages/Detail/index';
import KakaoOauth from '../pages/Login/KakaoLogin';
import Mypage from '../pages/Mypage';
import Header from './../components/header';

function Router() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<Header />} />
      </Routes>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login/kakao/oauth" element={<KakaoOauth />} />
        <Route path="/mypage" element={<Mypage />} />
      </Routes>
    </>
  );
}
export default Router;
