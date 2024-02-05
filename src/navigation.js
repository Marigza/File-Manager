import fs from 'node:fs/promises';
import { showCurrentDirrectory } from './showCurrentDirectory.js';
import { showOperationFailed } from './showErrorMessage.js';

export function changeDirectory(path) {
  try {
    process.chdir(path);
  } catch {
    showOperationFailed();
  } finally {
    showCurrentDirrectory();
  }
};

export function showListOfCurrentDirectory() {
  fs.readdir(process.cwd(), { withFileTypes: true })
    .then((array) => {
      const dirArr = [];
      const fileArr = [];
      array.forEach(dirrent => {
        delete dirrent.path;
        if (dirrent.isDirectory()) {
          dirrent.type = 'directory';
          dirArr.push(dirrent);
        } else {
          dirrent.type = 'file';
          fileArr.push(dirrent);
        }
      })

      console.table(dirArr.sort().concat(fileArr.sort()));
    })
    .then(showCurrentDirrectory);
}