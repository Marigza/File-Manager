import fs from 'node:fs';
import fsPromises from 'node:fs/promises';
import { showCurrentDirrectory } from './showCurrentDirectory.js';
import { showOperationFailed } from './showErrorMessage.js';

export function readFile(pathToFile) {
  const readStream = fs.createReadStream(pathToFile);
  readStream.on('error', () => {
    showOperationFailed();
    showCurrentDirrectory();
  })
  readStream.on('data', chunk => {
    process.stdout.write(chunk);
    showCurrentDirrectory();
  })
};

export function createEmptyFile(fileName) {
  fsPromises.writeFile(fileName, '', { encoding: 'utf-8' })
    .then(() => {
      showCurrentDirrectory();
    })
    .catch(() => {
      showOperationFailed();
      showCurrentDirrectory();
    })
}

export function renameFile(pathToFile, newFileName) {
  const workingDirectory = pathToFile.split('/').slice(0, -1).join('/')
    ? pathToFile.split('/').slice(0, -1).join('/')
    : process.cwd();

  const newPathtoFile = workingDirectory.concat(`/${newFileName}`)
  fsPromises.rename(pathToFile, newPathtoFile)
    .catch(err => {
      showOperationFailed();
    })
    .finally(() => showCurrentDirrectory())
}

export async function copyFile(pathToFile, pathToNewDirectory) {

  try {
    await fsPromises.access(pathToFile);

    const fileName = pathToFile.split('/').pop();

    fsPromises.mkdir(pathToNewDirectory, { recursive: true })
      .then(() => {
        const sourceStream = fs.createReadStream(pathToFile);
        const destinationStream = fs.createWriteStream(`${pathToNewDirectory}/${fileName}`);
        sourceStream.pipe(destinationStream);
      })
  } catch {
    showOperationFailed();
  } finally {
    showCurrentDirrectory();
  }

}

export async function deleteFile(pathToFile) {
  try {
    await fsPromises.rm(pathToFile)
  } catch {
    showOperationFailed();
  } finally {
    showCurrentDirrectory();
  }
}

export async function moveFile(pathToFile, pathToNewDirectory) {
  try {
    await fsPromises.access(pathToFile);

    const fileName = pathToFile.split('/').pop();

    await fsPromises.mkdir(pathToNewDirectory, { recursive: true })
      .then(() => {
        const sourceStream = fs.createReadStream(pathToFile);
        const destinationStream = fs.createWriteStream(`${pathToNewDirectory}/${fileName}`);
        sourceStream.pipe(destinationStream);
      })

    await fsPromises.rm(pathToFile)

  } catch {
    showOperationFailed();
  } finally {
    showCurrentDirrectory();
  }
}