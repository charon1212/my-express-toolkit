import { SourceInfo } from "../menu2_execExpressToolkit";

export const backend_index = {
  path: 'backend/expressToolkit/index.ts',
  content: (source: SourceInfo[]) => `import { app } from "./app";
import { route } from './route';
import { common } from './common';

const index = async () => {

  common();
  const port = +(process.env['EXPRESS_PORT'] || 3000);
  app.listen(port, () => { console.log(\`start on port \${port}.\`); });
  route();

};

// エントリーポイント
index();
`,
};
