// import path from 'path';
// import glob from 'glob';
// import { cp, mkdir } from 'shelljs';
var path = require('path');
var glob = require('glob');
var cp = require('shelljs').cp;
var mkdir = require('shelljs').mkdir;

const PACKAGES_SRC_DIR = './';
const PACKAGES_OUT_DIR = './build';
const sourceDir = path.resolve(PACKAGES_SRC_DIR);
const outDir = path.resolve(PACKAGES_OUT_DIR);
const sourceFiles = glob.sync(`${sourceDir}/index.html`);

mkdir('-p', outDir);

sourceFiles.forEach(file => {
  cp(file, outDir);
});
