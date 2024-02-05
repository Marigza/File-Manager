import { showHomeDirectory, showCurrentDirrectory } from './showCurrentDirectory.js';
import { changeDirectory, showListOfCurrentDirectory } from './navigation.js';
import { readFile, createEmptyFile, renameFile, copyFile, deleteFile, moveFile } from './basicOperation.js';
import { getSystemInfo } from './getSystemInfo.js';
import { calculateHash } from './calculateHash.js';
import { compressFile, decompressFile } from './compressDecompress.js';

const commandData = {
  exit: '.exit',
  goUpper: 'up',
  changeDir: 'cd',
  listOfFiles: 'ls',

  readFile: 'cat',
  creatEmptyFile: 'add',
  renameFile: 'rn',
  copyFile: 'cp',
  moveFile: 'mv',
  deleteFile: 'rm',

  getSystemInfo: 'os',

  calculateHash: 'hash',

  compressFile: 'compress',
  decompressFile: 'decompress',
}

export function switchProcess(terminalComand, argumentArr) {

  switch (terminalComand) {

    case commandData.exit:
      return process.exit();

    case commandData.goUpper:

      console.log(process.cwd())  // TODO fix path here to dependent from home directory
      const pathDestination = process.cwd().split('\\').slice(0, -1).join('\\');
      changeDirectory(pathDestination);
      break;

    case commandData.changeDir:

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

    case commandData.listOfFiles:
      showListOfCurrentDirectory();
      break;

    case commandData.readFile:

      if (argumentArr.length !== 1) {
        process.stdout.write('Invalid input\n');
        showCurrentDirrectory();
      } else {
        try {
          readFile(argumentArr[0]);
        } catch (err) {
          console.log(`\nOperation failed\n`)
          showCurrentDirrectory();
        }
      }

      break;

    case commandData.creatEmptyFile:

      if (argumentArr.length !== 1) {
        process.stdout.write('Invalid input\n');
        showCurrentDirrectory();
      } else {
        createEmptyFile(argumentArr[0]);
      }

      break;

    case commandData.renameFile:
      if (argumentArr.length !== 2) {
        process.stdout.write('Invalid input\n');
        showCurrentDirrectory();
      } else {
        renameFile(argumentArr[0], argumentArr[1]);
      }
      break;

    case commandData.copyFile:
      if (argumentArr.length !== 2) {
        process.stdout.write('Invalid input\n');
        showCurrentDirrectory();
      } else {
        copyFile(argumentArr[0], argumentArr[1]);
      }
      break;

    case commandData.deleteFile:
      if (argumentArr.length !== 1) {
        process.stdout.write('Invalid input\n');
        showCurrentDirrectory();
      } else {
        deleteFile(argumentArr[0]);
      }
      break;

    case commandData.moveFile:
      if (argumentArr.length !== 2) {
        process.stdout.write('Invalid input\n');
        showCurrentDirrectory();
      } else {
        moveFile(argumentArr[0], argumentArr[1]);
      }
      break;

    case commandData.getSystemInfo:

      if (argumentArr.length !== 1) {
        process.stdout.write('Invalid input\n');
      } else {
        getSystemInfo(argumentArr[0]);
      }
      showCurrentDirrectory();

      break;

    case commandData.calculateHash:
      if (argumentArr.length !== 1) {
        process.stdout.write('Invalid input\n');
        showCurrentDirrectory();
      } else {
        calculateHash(argumentArr[0]);
      }
      break;

    case commandData.compressFile:
      if (argumentArr.length !== 2) {
        process.stdout.write('Invalid input\n');
        showCurrentDirrectory();
      } else {
        compressFile(argumentArr[0], argumentArr[1]);
      }
      break;

    case commandData.decompressFile:
      if (argumentArr.length !== 2) {
        process.stdout.write('Invalid input\n');
        showCurrentDirrectory();
      } else {
        decompressFile(argumentArr[0], argumentArr[1]);
      }
      break;

    default:
      process.stdout.write(`\nInvalid input\n`);
      return showCurrentDirrectory()
  }
}