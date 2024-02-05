import fs from 'node:fs/promises';
import crypto from 'node:crypto';
import { showCurrentDirrectory } from './navigation.js';

export async function calculateHash(pathToFile) {
  fs.readFile(pathToFile)
    .then((fileContent) => {
      const fileHash = crypto.createHash('SHA256').update(fileContent).digest('hex');
      console.log(fileHash);
    })
    .catch(() => console.log(`\nOperation failed\n`))
    .finally(() => showCurrentDirrectory())
}