import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import cors from 'cors';

const app = express();

// CORS 설정
app.use(cors());

// 프록시 설정
app.use(
  '/api',
  createProxyMiddleware({
    target: 'http://www.aladin.co.kr/ttb',
    pathRewrite: {
      '^/api': '',
    },
  }),
);

// 서버 실행
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
