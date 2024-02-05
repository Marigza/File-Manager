import os from 'node:os';
import fs from 'node:fs/promises';
import crypto from 'node:crypto';
import { showHomeDirectory, showCurrentDirrectory, changeDirectory, showListOfCurrentDirectory } from './navigation.js';
import { readFile, createEmptyFile, renameFile, copyFile, deleteFile, moveFile } from './basicOperation.js';
import { getSystemInfo } from './getSystemInfo.js';
import { calculateHash } from './calculateHash.js';

try {

  const processArgsLength = process.argv.length;
  const argsArray = process.argv[2].split('=');
 
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

    switch (command) {

      case commandData.exit:
        return process.exit();
      
      case 'hello':
        process.stdout.write(`you say hello`);
        return showCurrentDirrectory();
    
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
        break;
      
      case commandData.decompressFile:
        break;
      
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