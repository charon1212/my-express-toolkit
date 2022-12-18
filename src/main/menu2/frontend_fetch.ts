import { SourceInfo } from "../menu2_execExpressToolkit";

export const frontend_fetch = {
  path: 'frontend/expressToolkit/fetch.ts',
  content: (source: SourceInfo[]) => {
    const defineFunction = ({ name, uri, paramKeys, method, }: SourceInfo) => {
      const hasRequestBody = method !== 'GET' && method !== 'DELETE';
      const uri2 = uri.split('/').map((v) => v.startsWith(':') ? `\${${v.substring(1)}}` : v).join('/');
      /** args */
      const argArray: string[] = [];
      if (paramKeys.length !== 0) argArray.push('{ ' + paramKeys.join(', ') + ' }: { ' + paramKeys.map((key) => `${key}: string`).join(', ') + ' }');
      if (hasRequestBody) argArray.push(`body: Request${name}`);
      const args = argArray.join(', ');
      /** options */
      const optionArray: string[] = [];
      if (method !== 'GET') optionArray.push(`method: '${method}'`);
      if (hasRequestBody) optionArray.push(`body: JSON.stringify(body)`);
      const options = optionArray.length === 0 ? '' : `, { ${optionArray.join(', ')} }`;
      return [
        `export const fetch${name} = (${args}) =>`,
        `  fetch(\`\${hostUrl}${uri2}\`${options}).then((res) => res.json() as Promise<Response${name}>)`
      ];
    };

    const importList = source.flatMap(({ name }) => [`  Request${name},`, `  Response${name},`]);
    const fetchList = source.flatMap((si) => [si.comment, ...defineFunction(si)]);
    return `import {
${importList.join('\n')}
} from './type';

const hostUrl = 'http://localhost:3000';

${fetchList.join('\n')}
`;
  },
};
