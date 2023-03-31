import { createProxyMiddleware } from 'http-proxy-middleware';
import { Application } from 'express';

export default function configureProxy(app: Application) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://boribori-nine.vercel.app',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    }),
  );
}
