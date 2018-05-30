'use strict';

const fs = require('fs'),
      os = require('os'),
      path = require('path');

const promisify = require('util.promisify');

const readFile = promisify(fs.readFile),
      writeFile = promisify(fs.writeFile);

const getFile = function (filename) {
  if (!filename) {
    throw new Error('File name is missing.');
  }

  return path.join(os.homedir(), filename);
};

const dotFile = {
  async read (filename) {
    if (!filename) {
      throw new Error('File name is missing.');
    }

    if (!filename.startsWith('.')) {
      throw new Error('File name does not start with a dot.');
    }

    const file = getFile(filename);
    let data;

    try {
      data = await readFile(file, { encoding: 'utf8' });
    } catch (ex) {
      if (ex.code === 'ENOENT') {
        // If the dot file does not exist, return an empty object anyway.
        return {};
      }
      throw ex;
    }

    const json = JSON.parse(data);

    return json;
  },

  async write (filename, json) {
    if (!filename) {
      throw new Error('File name is missing.');
    }
    if (!json) {
      throw new Error('JSON is missing.');
    }

    if (!filename.startsWith('.')) {
      throw new Error('File name does not start with a dot.');
    }

    const file = getFile(filename);
    const data = JSON.stringify(json);

    await writeFile(file, data, { encoding: 'utf8' });
  }
};

module.exports = dotFile;
