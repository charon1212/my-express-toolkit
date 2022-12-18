import { SourceInfo } from "../menu2_execExpressToolkit";

export const backend_app = {
  path: 'backend/expressToolkit/app.ts',
  content: (source: SourceInfo[]) => `import express from 'express';

export const app = express();
`,
};
