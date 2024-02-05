import os from 'node:os';
import { showInvalidInput } from './showErrorMessage.js';

export function getSystemInfo(comand) {
  switch (comand) {

    case '--EOL':
      console.log(JSON.stringify(os.EOL));
      break;
    case '--cpus':
      console.log(`overall amount of CPUS ${os.cpus().length}`);
      os.cpus().forEach(({ model }) => { console.log(model) });
      break;
    case '--homedir':
      console.log(os.homedir());
      break;
    case '--username':
      console.log(os.userInfo().username);
      break;
    case '--architecture':
      console.log(os.arch());
      break;
    default:
      showInvalidInput();
  }
};