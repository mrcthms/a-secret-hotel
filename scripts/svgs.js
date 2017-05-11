import path from 'path';
import fs from 'pn/fs';
import glob from 'glob';
import { mkdir } from 'shelljs';
import svg2png from 'svg2png';
import imagemin from 'imagemin';
import imageminSvgo from 'imagemin-svgo';
import last from 'lodash/last';

const SRC_DIR = './src';
const OUT_DIR = './build/images';
const sourceDir = path.resolve(SRC_DIR);
const outDir = path.resolve(OUT_DIR);
const images = glob.sync(`${sourceDir}/**/*.svg`);

const minimise = images => {
  const plugins = [
    imageminSvgo()
  ];
  imagemin(images, outDir, {
    plugins
  });
};

const toPng = image => {
  const imageUrl = last(image.split('/'));
  fs.readFile(image)
    .then(svg2png)
    .then(buffer => fs.writeFile(`${outDir}/${imageUrl.replace('.svg', '.png')}`, buffer))
    .catch(err => console.log(err));
};

const optimise = (images) => {
  minimise(images);
  images.forEach(toPng);
};

const init = () => {
  if (!fs.existsSync(outDir)) {
    mkdir('-p', outDir);
  }
  optimise(images);
};

init();
