import { SourceInfo } from "../menu2_execExpressToolkit";

export const backend_resource = {
  path: ({ backendDirPath, filename }: SourceInfo) => `backend/expressToolkit${backendDirPath}/${filename}.ts`,
  content: ({ name, uri, filename, backendDirPath, method, paramKeys }: SourceInfo) => {
    const toRoot = backendDirPath.split('/').filter((v) => v).map(() => `..`).join('/');
    const requestParams = paramKeys.map((key) => `    const ${key} = req.params.${key}`).join('\n');
    return `import { app } from "${toRoot}/app";
import { Request${name} } from "${toRoot}/type";
import { Response${name} } from "${toRoot}/type";

export const ${filename} = () => {
  app.${method.toLowerCase()}('${uri}', async (req, res) => {
    const requestBody = req.body as Request${name};
${requestParams}

    // response
    const response: Response${name} = {};
    res.send(response);
  });
};
`},
};
