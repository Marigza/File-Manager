import { showCurrentDirrectory, changeDirectory, showListOfCurrentDirectory } from './navigation.js'

try {

  const processArgsLength = process.argv.length;
  const argsArray = process.argv[2].split('=');
 
  const commandData = {
    exit: '.exit',
    goUpper: 'up',
    changeDir: 'cd',
    listOfFiles: 'ls',
  }

  let userName;

  if (argsArray[0] === '--username' && processArgsLength === 3 && argsArray.length === 2) {
    userName = argsArray[1];
  } else {
    throw new Error('Invalid input');
  }

  process.stdout.write(`Welcome to the File Manager, ${userName}!\n`);
  showCurrentDirrectory();

  process.stdin.on('data', (data) => {
    const dataTrimmed = data.toString().trim();
    const arrayOfData = dataTrimmed.split(' ');
    const command = arrayOfData[0];
    const argumentArr = arrayOfData.slice(1);

    switch (command) {

      case commandData.exit:
        return process.exit();
      
      case 'hello':
        process.stdout.write(`you say hello`);
        return showCurrentDirrectory();
    
      case commandData.goUpper:                       //done
        const pathDestination = process.cwd().split('\\').slice(0, -1).join('\\');
        changeDirectory(pathDestination);
        break;
      
      case commandData.changeDir:                     //done

        if (argumentArr.length !== 1) {
          process.stdout.write('Invalid input\n');
          showCurrentDirrectory();
        } else {
          try {
            changeDirectory(argumentArr[0]);
          } catch (err) {
            console.log(`\nOperation failed\n`)
            showCurrentDirrectory();
          }
        }

        break;
      
      case commandData.listOfFiles:                   //done
        showListOfCurrentDirectory();
        break;
      // case:
      //   break;
      default:
        process.stdout.write(`\nInvalid input\n`);
        return showCurrentDirrectory()
    }
  })

  process.on('SIGINT', () => {
    process.exit();
  });

  process.on('exit', () => {
    process.stdout.write(`\nThank you for using File Manager, ${userName}, goodbye!\n`)
  });
} catch (err) {
  throw new Error('Invalid input.\nTo start file manager, please use: "npm run start -- --username=your_username"')
}