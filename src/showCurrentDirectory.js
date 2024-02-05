import os from 'node:os';

export function showHomeDirectory() {
  process.stdout.write(`\nYou are currently in ${os.homedir()}\n`);
}
export function showCurrentDirrectory() {
  console.log('\x1b[36m%s\x1b[0m', `\nYou are currently in ${process.cwd()}\n`);
};