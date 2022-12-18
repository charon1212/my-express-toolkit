import { SourceInfo } from "../menu2_execExpressToolkit";

export const backend_route = {
  path: 'backend/expressToolkit/route.ts',
  content: (source: SourceInfo[]) => {
    const importList = source.map(({ backendDirPath, filename }) => `import { ${filename} } from '.${backendDirPath}/${filename}';`);
    const routeList = source.map(({ comment, filename }) => `  ${comment}\n  ${filename}();`);
    return importList.join('\n') + '\n'
      + '\n'
      + 'export const route = () => {' + '\n'
      + '\n'
      + routeList.join('\n') + '\n'
      + '\n'
      + '};' + '\n';
  },
};
