import * as fs from 'fs';
import { baseDirPath } from '../util/baseDirPath';

export const menu1_createTypeFileTemplate = () => fs.writeFileSync(`${baseDirPath}/templateTypeFile.ts`, template);

const template = `
// GET: /sample/v1/user
export type RequestGetUser = {};
export type ResponseGetUser = { list: { id: string, name: string, age: number, }[] };

// POST: /sample/v1/user
export type RequestPostUser = { user: { name: string, age: number, } };
export type ResponsePostUser = { user: { id: string, name: string, age: number, } };

// PUT: /sample/v1/user/:userId
export type RequestPutUser = { user: { name: string, age: number, } };
export type ResponsePutUser = { user: { id: string, name: string, age: number, } };

// DELETE: /sample/v1/user/:userId
export type RequestDeleteUser = {};
export type ResponseDeleteUser = {};
`;
