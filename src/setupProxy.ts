import { createProxyMiddleware } from 'http-proxy-middleware';
import { Application } from 'express';

export default function configureProxy(app: Application) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://www.aladin.co.kr/ttb',
      pathRewrite: {
        '^/api': '',
      },
    }),
  );
}
