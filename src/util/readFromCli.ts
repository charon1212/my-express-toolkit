import * as readline from 'readline';

export const readFromCli = async (question: string, accept?: (input: string) => boolean) => {
  while (true) {
    const input = await read(question);
    if (!accept || accept(input)) return input;
  }
};

const read = (question: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const readInterface = readline.createInterface({ input: process.stdin, output: process.stdout });
    readInterface.question(question,
      (input) => {
        readInterface.close();
        resolve(input);
      });
  });
};

