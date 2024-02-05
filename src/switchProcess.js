import { showCurrentDirrectory } from './showCurrentDirectory.js';
import { changeDirectory, showListOfCurrentDirectory } from './navigation.js';
import { readFile, createEmptyFile, renameFile, copyFile, deleteFile, moveFile } from './basicOperation.js';
import { getSystemInfo } from './getSystemInfo.js';
import { calculateHash } from './calculateHash.js';
import { compressFile, decompressFile } from './compressDecompress.js';
import { showInvalidInput, showOperationFailed } from './showErrorMessage.js';

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
      if (argumentArr.length !== 0) {
        showInvalidInput();
      } else {
        const pathDestination = process.cwd().split('\\').slice(0, -1).join('\\');
        changeDirectory(pathDestination);
      }
      
      break;

    case commandData.changeDir:

      if (argumentArr.length !== 1) {
        showInvalidInput();
        showCurrentDirrectory();
      } else {
        try {
          changeDirectory(argumentArr[0]);
        } catch (err) {
          showOperationFailed();
          showCurrentDirrectory();
        }
      }

      break;

    case commandData.listOfFiles:
      if (argumentArr.length !== 0) {
        showInvalidInput();
      } else {
        showListOfCurrentDirectory();
      }
      break;

    case commandData.readFile:

      if (argumentArr.length !== 1) {
        showInvalidInput();
        showCurrentDirrectory();
      } else {
        try {
          readFile(argumentArr[0]);
        } catch (err) {
          showOperationFailed();
          showCurrentDirrectory();
        }
      }

      break;

    case commandData.creatEmptyFile:

      if (argumentArr.length !== 1) {
        showInvalidInput();
        showCurrentDirrectory();
      } else {
        createEmptyFile(argumentArr[0]);
      }

      break;

    case commandData.renameFile:
      if (argumentArr.length !== 2) {
        showInvalidInput();
        showCurrentDirrectory();
      } else {
        renameFile(argumentArr[0], argumentArr[1]);
      }
      break;

    case commandData.copyFile:
      if (argumentArr.length !== 2) {
        showInvalidInput();
        showCurrentDirrectory();
      } else {
        copyFile(argumentArr[0], argumentArr[1]);
      }
      break;

    case commandData.deleteFile:
      if (argumentArr.length !== 1) {
        showInvalidInput();
        showCurrentDirrectory();
      } else {
        deleteFile(argumentArr[0]);
      }
      break;

    case commandData.moveFile:
      if (argumentArr.length !== 2) {
        showInvalidInput();
        showCurrentDirrectory();
      } else {
        moveFile(argumentArr[0], argumentArr[1]);
      }
      break;

    case commandData.getSystemInfo:

      if (argumentArr.length !== 1) {
        showInvalidInput();
      } else {
        getSystemInfo(argumentArr[0]);
      }
      showCurrentDirrectory();

      break;

    case commandData.calculateHash:
      if (argumentArr.length !== 1) {
        showInvalidInput();
        showCurrentDirrectory();
      } else {
        calculateHash(argumentArr[0]);
      }
      break;

    case commandData.compressFile:
      if (argumentArr.length !== 2) {
        showInvalidInput();
        showCurrentDirrectory();
      } else {
        compressFile(argumentArr[0], argumentArr[1]);
      }
      break;

    case commandData.decompressFile:
      if (argumentArr.length !== 2) {
        showInvalidInput();
        showCurrentDirrectory();
      } else {
        decompressFile(argumentArr[0], argumentArr[1]);
      }
      break;

    default:
      showInvalidInput();
      return showCurrentDirrectory()
  }
}