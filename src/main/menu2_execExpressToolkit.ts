import * as fs from 'fs';
import { baseDirPath } from '../util/baseDirPath';
import { readFromCli } from "../util/readFromCli";
import { backend_app } from './menu2/backend_app';
import { backend_common } from './menu2/backend_common';
import { backend_index } from './menu2/backend_index';
import { backend_resource } from './menu2/backend_resource';
import { backend_route } from './menu2/backend_route';
import { frontend_fetch } from './menu2/frontend_fetch';

export const menu2_execExpressToolkit = async () => {
  const typeFilePath = await readFromCli('input type file path >', (path) => {
    if (fs.existsSync(path)) return true;
    console.log(`Not found. path=[${path}]`);
    return false;
  });
  const typeFileContent = fs.readFileSync(typeFilePath).toString();
  const sourceInfo = getSourceInfo(typeFileContent);

  const MAKER = makeMaker(sourceInfo);
  MAKER(backend_app);
  MAKER(backend_common);
  MAKER(backend_index);
  MAKER(backend_route);
  MAKER({ path: `backend/expressToolkit/type.ts`, content: () => typeFileContent });
  MAKER({ path: `frontend/expressToolkit/type.ts`, content: () => typeFileContent });
  MAKER(frontend_fetch);

  const MAKER2 = makeMaker2(sourceInfo);
  MAKER2(backend_resource);

  console.log(sourceInfo);

};

export type SourceInfo = { comment: string, name: string, method: string, uri: string, paramKeys: string[], backendDirPath: string, filename: string, }
const getSourceInfo = (text: string) => {
  const lines = text.split('\r\n').flatMap((v) => v.split('\n'));
  let i = 0;
  const sourceInfo: SourceInfo[] = [];
  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith('// ')) {
      const colonIndex = line.indexOf(': ');
      const method = line.substring(3, colonIndex);
      const uri = line.substring(colonIndex + 2);
      if (uri.startsWith('/')) {
        const requestTypeLine = lines[i + 1];
        const comment = line;
        const name = requestTypeLine.substring('export type Request'.length, requestTypeLine.indexOf(' = '));
        const paramKeys = uri.split('/').filter((v) => v.startsWith(':')).map((v) => v.substring(':'.length));
        const backendDirPath = '/resource' + uri.split('/').filter((v) => !v.startsWith(':')).map((v) => convertKebabu(v)).join('/');
        const filename = name[0].toLowerCase() + name.substring(1);
        sourceInfo.push({ comment, name, method, uri, paramKeys, backendDirPath, filename });
        i += 3;
        continue;
      }
    }
    i++;
  }
  return sourceInfo;
};

const back = (sourceInfo: SourceInfo[]) => {
  // backend/expressToolkit/index.ts
  // backend/expressToolkit/app.ts
};

const front = (sourceInfo: SourceInfo[]) => { };

const makeMaker = (sourceInfo: SourceInfo[]) => ({ path, content }: { path: string, content: (source: SourceInfo[]) => string }) => {
  const relDirPath = path.substring(0, path.lastIndexOf('/'));
  fs.mkdirSync(`${baseDirPath}/${relDirPath}`, { recursive: true });
  fs.writeFileSync(`${baseDirPath}/${path}`, kaigyoTouitu(content(sourceInfo)));
};

const makeMaker2 = (sourceInfo: SourceInfo[]) => ({ path, content }: { path: (source: SourceInfo) => string, content: (source: SourceInfo) => string }) => {
  sourceInfo.forEach((si) => {
    const path2 = path(si);
    const relDirPath = path2.substring(0, path2.lastIndexOf('/'));
    fs.mkdirSync(`${baseDirPath}/${relDirPath}`, { recursive: true });
    fs.writeFileSync(`${baseDirPath}/${path2}`, kaigyoTouitu(content(si)));
  });
};

const convertKebabu = (s: string) => {
  let result = '';
  let sw = false;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '-') {
      sw = true;
    } else {
      result += sw ? s[i].toUpperCase() : s[i];
      sw = false;
    }
  }
  return result;
};

const kaigyoTouitu = (s: string) => s.replace(/\r\n?/g, '\n').replace(/\n/g, '\r\n');
