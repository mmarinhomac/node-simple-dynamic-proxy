import express from 'express';
import morgan from "morgan";
import cors from "cors"
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
app.use(morgan('dev'));
app.use(cors());

app.get('/', (_, res) => {
  res.send('This is a proxy service');
});

const customRouter = function (req) {
  return req.query.baseURL
};

app.use('/', createProxyMiddleware({
  target: "http://localhost:8080",
  changeOrigin: true,
  router: customRouter,
}));

app.listen(3004, () => {
  console.log(`Started Proxy ⚡`);
});
