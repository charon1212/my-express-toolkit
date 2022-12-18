import { SourceInfo } from "../menu2_execExpressToolkit";

export const frontend_fetch = {
  path: 'frontend/expressToolkit/fetch.ts',
  content: (source: SourceInfo[]) => {
    const defineFunction = ({ name, uri, paramKeys, method, }: SourceInfo) => {
      const uri2 = uri.split('/').map((v) => v.startsWith(':') ? `\${${v.substring(1)}}` : v).join('/');
      const paramArgs = paramKeys.length === 0 ? `{}` : '{ ' + paramKeys.join(', ') + ' }';
      const paramType = paramKeys.length === 0 ? `{}` : '{ ' + paramKeys.map((key) => `${key}: string`).join(', ') + ' }';
      if (method !== 'GET' && method !== 'DELETE') {
        return `export const fetch${name} = wrapFetchWithBody<${paramType}, Request${name}, Response${name}>('${method}', (${paramArgs}) => \`${uri2}\`)`;
      } else {
        return `export const fetch${name} = wrapFetchNoBody<${paramType}, Response${name}>('${method}', (${paramArgs}) => \`${uri2}\`)`;
      }
    };

    const importList = source.flatMap(({ name }) => [`  Request${name},`, `  Response${name},`]);
    const fetchList = source.flatMap((si) => [si.comment, defineFunction(si)]);

    return `import {
${importList.join('\n')}
} from './type';

const hostUrl = 'http://localhost:3000';

const defaultHeaders = {
  'content-type': 'application/json'
};
const wrapFetchNoBody = <Param, Res>(method: string, uri: (param: Param) => string) =>
  (param: Param): Promise<Res> =>
    fetch(\`\${hostUrl}\${uri(param)}\`, { method, headers: { ...defaultHeaders } }).then((res) => res.json());
const wrapFetchWithBody = <Param, Body, Res>(method: string, uri: (param: Param) => string) =>
  (param: Param, body: Body): Promise<Res> =>
    fetch(\`\${hostUrl}\${uri(param)}\`, { method, body: JSON.stringify(body), headers: { ...defaultHeaders } }).then((res) => res.json());

${fetchList.join('\n')}
`;
  },
};
