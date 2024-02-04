import fs from 'node:fs/promises';

export function showCurrentDirrectory() {
  process.stdout.write(`\nYou are currently in ${process.cwd()}\n`);
};

export function changeDirectory(path) {
  try {
    process.chdir(path);
    console.log('working dirrectory: ', process.cwd())
  } catch {
    console.log(`\nOperation failed\n`)
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