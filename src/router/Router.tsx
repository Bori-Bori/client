import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Main from '../pages/Main';
import Detail from '../pages/Detail/index';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/detail" element={<Detail />} />
    </Routes>
  );
}
export default Router;
