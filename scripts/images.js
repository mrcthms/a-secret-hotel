import path from 'path';
import fs from 'fs';
import glob from 'glob';
import { mkdir } from 'shelljs';
const gm = require('gm').subClass({ imageMagick: true });
import imagemin from 'imagemin';
import imageminJpegtran from 'imagemin-jpegtran';
import imageminPngquant from 'imagemin-pngquant';
import last from 'lodash/last';

const SRC_DIR = './src';
const OUT_DIR = './build/images';
const sourceDir = path.resolve(SRC_DIR);
const outDir = path.resolve(OUT_DIR);
const images = glob.sync(`${sourceDir}/**/*.{jpg,jpeg,gif,png}`);
const retinaRegex = /^([A-z0-9-_.]*)@2x(\.[a-z]{2,4})$/;

const isRetina = image => retinaRegex.test(image);

const resizeImage = (buffer, imageUrl) => {
  gm(buffer)
  .resize(50, 50, '%')
  .write(`${outDir}/${imageUrl.replace(/@2x(\.[a-z]{2,4})$/, '$1')}`, err => {
    if (err) {
      return console.log(`Error with ${imageUrl}: `, err);
    }
  });
};

const processImage = (buffer, imageUrl) => {
  gm(buffer)
    .write(`${outDir}/${imageUrl}`, err => err && console.log(err));
};

const optimise = image => {
  let plugins = [];
  const imageUrl = last(image.split('/'));
  if (imageUrl.match(/\.png$/)) {
    plugins.push(imageminPngquant());
  }
  if (imageUrl.match(/\.jpe?g$/)) {
    plugins.push(imageminJpegtran());
  }
  const buf = fs.readFileSync(image);

  imagemin.buffer(buf, plugins)
    .then(buffer => processImage(buffer, imageUrl));

  if (isRetina(imageUrl)) {
    imagemin.buffer(buf, plugins)
      .then(buffer => resizeImage(buffer, imageUrl));
  }
};

const init = () => {
  if (!fs.existsSync(outDir)) {
    mkdir('-p', outDir);
  }
  images.forEach(optimise);
};

init();
