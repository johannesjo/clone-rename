#! /usr/bin/env node
// node ./tools/copy-rename.js ./src/app/features/issue/providers/open-project varin varout

const fs = require('fs');
const path = require('path');
const {camelCase, kebabCase, upperCase, startCase} = require('lodash');

const rm = {
  kebabCase,
  camelCase,
  pascalCase: (str) => startCase(camelCase(str)).replace(/ /g, ''),
  constantCase: (str) => upperCase(str).replace(/ /g, '_'),
}
const CFG = {
  fileNames: rm.kebabCase,
  variableNames: [rm.pascalCase, rm.camelCase, rm.constantCase, rm.kebabCase],
}

// console.log(process.argv);
const dir = process.argv[2];
const inVal = process.argv[3];
const outVal = process.argv[4];

console.log('\n_______________CLONE_RENAME_______________');
console.log('In dir: ', dir);
console.log('Input     ', inVal, '=>', outVal);
console.log('-------------------------------------------');
console.log('fileNames ', CFG.fileNames(inVal), '=>', CFG.fileNames(outVal));

renameFileAndFolderNamesRecursive(dir, CFG.fileNames(inVal), CFG.fileNames(outVal));

CFG.variableNames.forEach(rm => {
  console.log('variables ', rm(inVal), '=>', rm(outVal));
  renameVariableNamesRecursive(dir, rm(inVal), rm(outVal));
});
console.log('__________________________________________');


function renameFileAndFolderNamesRecursive(dir, from, to) {
  fs.readdirSync(dir).forEach((it) => {
    const itsPath = path.resolve(dir, it);
    const itsStat = fs.statSync(itsPath);

    if (itsPath.search(from) > -1) {
      fs.renameSync(itsPath, itsPath.replace(from, to));
    }

    if (itsStat.isDirectory()) {
      renameFileAndFolderNamesRecursive(itsPath.replace(from, to), from, to);
    }
  });
}

function renameVariableNamesRecursive(dir, from, to) {
  fs.readdirSync(dir).forEach((it) => {
    const itsPath = path.resolve(dir, it);
    const itsStat = fs.statSync(itsPath);

    if (itsStat.isDirectory()) {
      renameVariableNamesRecursive(itsPath, from, to);
    } else {
      const data = fs.readFileSync(itsPath, {encoding: 'UTF-8'});
      const replacer = new RegExp(from, 'g')
      const transformed = data.replace(replacer, to)
      fs.writeFileSync(itsPath, transformed);
    }
  });
}
