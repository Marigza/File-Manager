import os from 'node:os';

export function showHomeDirectory() {
  console.log('\x1b[36m%s\x1b[0m', `\nYou are currently in ${os.homedir()}\n`);
  process.chdir(os.homedir());
}

export function showCurrentDirrectory() {
  console.log('\x1b[36m%s\x1b[0m', `\nYou are currently in ${process.cwd()}\n`);
};