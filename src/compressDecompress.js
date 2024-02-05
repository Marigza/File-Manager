import { createBrotliCompress, createBrotliDecompress } from 'node:zlib';
import fs from 'node:fs';
import { pipeline } from 'node:stream';
import { showCurrentDirrectory } from './showCurrentDirectory.js';

export function compressFile(pathToFile, pathToDestination) {
  const compressStream = createBrotliCompress();
  const sourceStream = fs.createReadStream(pathToFile, 'utf-8');
  const destinationStream = fs.createWriteStream(pathToDestination);

  pipeline(
    sourceStream,
    compressStream,
    destinationStream,
    err => {
      if (err) {
        console.log(`\nOperation failed\n`);
      }
      showCurrentDirrectory();
    }
  )
}

export function decompressFile(pathToFile, pathToDestination) {
  const decompressStream = createBrotliDecompress();
  const sourceStream = fs.createReadStream(pathToFile);
  const destinationStream = fs.createWriteStream(pathToDestination);

  pipeline(
    sourceStream,
    decompressStream,
    destinationStream,
    err => {
      if (err) {
        console.log(`\nOperation failed\n`, err);
      }
      showCurrentDirrectory();
    }
  )
}