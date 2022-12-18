import { readFromCli } from "../util/readFromCli";
import { menu1_createTypeFileTemplate } from "./menu1_createTypeFileTemplate";
import { menu2_execExpressToolkit } from "./menu2_execExpressToolkit";

const menuList = [
  { id: 1, name: 'createTypeFileTemplate', exec: menu1_createTypeFileTemplate },
  { id: 2, name: 'execExpressToolkit', exec: menu2_execExpressToolkit },
];

export const menu = async () => {
  console.log(`****  menu  ****`);
  menuList.forEach(({ id, name }) => console.log(`    ${id} - ${name}`));
  const menuId = await readFromCli('input menu ID >', (input) => menuList.some(({ id }) => id === +input));
  await menuList.find(({ id }) => id === +menuId)?.exec();
};
