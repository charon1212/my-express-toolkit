import { SourceInfo } from "../menu2_execExpressToolkit";

export const backend_common = {
  path: 'backend/expressToolkit/common.ts',
  content: (source: SourceInfo[]) => `import express from 'express';
import { app } from "./app";

export const common = () => {
  useLog();
  useCors();
  useJson();
};

/**
 * logging
 */
const useLog = () => app.use((req, _, next) => {
  console.log('**REQUEST**');
  console.log(JSON.stringify({
    url: req.url,
    headers: req.headers,
    body: req.body,
    params: req.params,
    query: req.query,
  }));
  next();
});

/**
 * JSON parserを設定し、request.bodyをJSONオブジェクトにする。
 * see:https://expressjs.com/ja/4x/api.html#req.body
 * > By default, it is undefined, and is populated when you use body-parsing middleware such as express.json() or express.urlencoded().
 */
const useJson = () => app.use(express.json());

/**
 * CORS設定
 */
const useCors = () => app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, auth-token, access_token');
  if (req.method === 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
});
`,
};
