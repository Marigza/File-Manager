import fs from 'node:fs/promises';
import crypto from 'node:crypto';
import { showCurrentDirrectory } from './showCurrentDirectory.js';
import { showOperationFailed } from './showErrorMessage.js';

export async function calculateHash(pathToFile) {
  fs.readFile(pathToFile)
    .then((fileContent) => {
      const fileHash = crypto.createHash('SHA256').update(fileContent).digest('hex');
      console.log(fileHash);
    })
    .catch(() => showOperationFailed())
    .finally(() => showCurrentDirrectory())
}