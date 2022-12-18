import { MyDate } from "util-charon1212";
import * as fs from 'fs';

const timestamp = new MyDate().format('yyyyMMddhhmmss');
export const baseDirPath = `result/${timestamp}`;
if (!fs.existsSync(baseDirPath)) fs.mkdirSync(baseDirPath, { recursive: true });
