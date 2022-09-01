#!/usr/bin/env node
const { spawn, spawnSync } = require('child_process');
const path = require('path');
const fs = require('fs');

/**
 *
 * @typedef {import('child_process').SpawnOptionsWithoutStdio} SpawnOptionsWithoutStdio
 * @param {string} command
 * @param {srting[]} args
 * @param {SpawnOptionsWithoutStdio} options
 * @returns {Promise<{ code: number | null, signal: NodeJS.Signals | null }>}
 */
function spawnPromise(command, args, options) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, options);
    child.on('close', (code, signal) => {
      if (code === 0) {
        resolve({ code, signal });
      } else {
        reject({ code, signal });
      }
    });
  });
}

function copyIfDiffer(src, dst) {
  if (!fs.existsSync(src)) {
    return;
  }

  if (!fs.existsSync(dst)) {
    const dir = path.dirname(dst);
    fs.mkdirSync(dir, { recursive: true });
    fs.copyFileSync(src, dst);
    return;
  }

  const srcBuff = fs.readFileSync(src);
  const dstBuff = fs.readFileSync(dst);
  if (srcBuff.equals(dstBuff)) {
    return;
  }

  fs.copyFileSync(src, dst);
}

function wildcardSearch(dirname, filter, ignoreList = []) {
  if (!fs.existsSync(dirname)) {
    return [];
  }

  const files = fs.readdirSync(dirname);
  const found = files.reduce((found, entry) => {
    const filepath = path.join(dirname, entry);
    const stat = fs.lstatSync(filepath);

    if (stat.isDirectory() && !ignoreList.includes(entry)) {
      return found.concat(wildcardSearch(filepath, filter, ignoreList));
    }

    if (filter.test(filepath)) {
      return found.concat(filepath);
    }

    return found;
  }, []);

  return found;
}

function removeDirnameFromPathList(dirname, filepathList) {
  return filepathList.map((filepath) => {
    if (filepath.startsWith(dirname)) {
      return filepath.replace(path.join(dirname, path.sep), '');
    }
    return filepath;
  });
}

function installEnv() {
  let envList = wildcardSearch(
    path.join(__dirname, 'apps'),
    /\.env.*\.example$/,
    ['node_modules', 'build', 'dist', '.next', '.turbo']
  );
  envList.forEach((env) => {
    const src = env;
    const dst = env.replace(/\.example$/, '');
    if (!fs.existsSync(dst)) {
      console.log(`New ${dst}`);
      const dir = path.dirname(dst);
      fs.mkdirSync(dir, { recursive: true });
      fs.copyFileSync(src, dst);
    } else {
      console.log(`Exists ${dst}`);
    }
  });
}

function install() {
  spawnSync('yarn', ['install'], { stdio: 'inherit' });
  spawnSync('npx', ['prisma', 'generate'], {
    stdio: 'inherit',
    cwd: path.join(__dirname, 'apps', 'api'),
  });
}

function dockerBuild() {
  const BASE_PATH = 'json';
  fs.mkdirSync(path.join(__dirname, BASE_PATH), { recursive: true });

  let packageList = wildcardSearch(__dirname, /package.json/, [
    BASE_PATH,
    'node_modules',
    '.next',
    '.turbo',
    '.nyc_output',
    'build',
    'dist',
    'lib',
    'test',
    '__test__',
  ]);
  packageList = removeDirnameFromPathList(__dirname, packageList);
  packageList = [...packageList, 'yarn.lock'];
  packageList = [...packageList, 'turbo.json'];
  packageList.forEach((filename) => {
    copyIfDiffer(
      path.join(__dirname, filename),
      path.join(__dirname, BASE_PATH, filename)
    );
  });

  spawnSync('docker-compose', ['build'], { stdio: 'inherit' });
}

function help() {
  console.table(COMMAND_TABLE);
}

const COMMAND_TABLE = {
  'install-env': installEnv,
  install: install,
  'docker-build': dockerBuild,
  help: help,
};

function main(argv) {
  const command = argv[0];
  const func = COMMAND_TABLE[command] ?? help;
  func(argv.slice(1));
}

main(process.argv.slice(2));
