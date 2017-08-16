const Shell = require('node-powershell');
const path = require('path');
const copyfiles = require('copyfiles');
const rimraf = require('rimraf');
const fs = require('fs');

const ps = new Shell({
  executionPolicy: 'Bypass',
  debugMsg: true,
  noProfile: true,
});

const sourcePath = path.join(__dirname, 'distLogin', '*.*');
const configPath = path.join(__dirname, 'src', 'config.js');

const copyFilesPromise = (paths, opts) => new Promise((resolve, reject) => {
  try {
    copyfiles(paths, opts, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  } catch (ex) {
    reject(ex);
  }
});

const renameFilePromise = (oldPath, newPath) => new Promise((resolve, reject) => {
  try {
    fs.rename(oldPath, newPath, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  } catch (ex) {
    reject(ex);
  }
});

const removeDirPromise = dirPath => new Promise((resolve, reject) => {
  try {
    rimraf(dirPath, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  } catch (ex) {
    reject(ex);
  }
});

ps.addCommand('(get-webapplication -Name SRSIdentityServer).PhysicalPath')
.then(() => ps.invoke())
.then((installPath) => {
  if (!installPath || installPath.trim() === '') {
    console.error('SRSIdentityServer not found in IIS or could not interrogate IIS');
    return;
  }
  console.log(`installing to: ${installPath}`);

  const resourcePath = path.join(installPath.trim(), 'Content', 'app', 'static');
  const rootPath = path.join(installPath.trim(), 'Content', 'app');
  const htmlPath = path.join(installPath.trim(), 'Content', 'app', 'static', 'index.html');
  const htmlPathRename = path.join(installPath.trim(), 'Content', 'app', 'static', 'login.html');

  ps.dispose();

  // eslint-disable-next-line consistent-return
  return removeDirPromise(resourcePath)
  .then(() =>
    copyFilesPromise([
      sourcePath,
      resourcePath,
    ], 6)
  ).then(() =>
    copyFilesPromise([
      configPath,
      resourcePath,
    ], 6)
  ).then(() =>
    renameFilePromise(
      htmlPath,
      htmlPathRename
    )
  ).then(() =>
    copyFilesPromise([
      htmlPathRename,
      rootPath,
    ], true)
  );
})
.then(() => console.log('done'))
.catch((err) => {
  console.log(err);
  ps.dispose();
});

