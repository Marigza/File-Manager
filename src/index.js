import { switchProcess } from './switchProcess.js';
import { showCurrentDirrectory } from './showCurrentDirectory.js'

try {

  const processArgsLength = process.argv.length;
  const argsArray = process.argv[2].split('=');
 
  let userName;

  if (argsArray[0] === '--username' && processArgsLength === 3 && argsArray.length === 2) {
    userName = argsArray[1];
  } else {
    throw new Error('Invalid input');
  }

  process.stdout.write(`Welcome to the File Manager, ${userName}!\n`);
  //showHomeDirectory();
  showCurrentDirrectory(); //TODO fix start dir and update navigation functions

  process.stdin.on('data', (data) => {
    const dataTrimmed = data.toString().trim();
    const arrayOfData = dataTrimmed.split(' ');
    const command = arrayOfData[0];
    const argumentArr = arrayOfData.slice(1);

    switchProcess(command, argumentArr);

  })

  process.on('SIGINT', () => {
    process.exit();
  });

  process.on('exit', () => {
    process.stdout.write(`\nThank you for using File Manager, ${userName}, goodbye!\n`)
  });

} catch (err) {
  throw new Error('Invalid input.\nTo start file manager, please use: "npm run start -- --username=your_username"', err)
}