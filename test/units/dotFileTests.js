'use strict';

const fs = require('fs');

const assert = require('assertthat'),
      promisify = require('util.promisify'),
      uuid = require('uuidv4');

const dotFile = require('../../src/dotFile');

const unlink = promisify(fs.unlink);

suite('dotFile', () => {
  let filename;

  setup(() => {
    filename = `.${uuid()}`;
  });

  teardown(async () => {
    try {
      await unlink(filename);
    } catch (ex) {
      if (ex.code === 'ENOENT') {
        // If no dot file was created in a test, there is no need to delete it.
        return;
      }
      throw ex;
    }
  });

  test('is an object.', async () => {
    assert.that(dotFile).is.ofType('object');
  });

  suite('read', () => {
    test('is a function.', async () => {
      assert.that(dotFile.read).is.ofType('function');
    });

    test('throws an error when file name is missing.', async () => {
      await assert.that(async () => {
        await dotFile.read();
      }).is.throwingAsync('File name is missing.');
    });

    test('throws an error when the file name does not start with a dot.', async () => {
      await assert.that(async () => {
        await dotFile.read('foo');
      }).is.throwingAsync('File name does not start with a dot.');
    });

    test('returns an empty object if the file does not exist.', async () => {
      const json = await dotFile.read(filename);

      assert.that(json).is.equalTo({});
    });

    test('returns the previously written JSON.', async () => {
      await dotFile.write(filename, { version: '1.0.0' });

      const json = await dotFile.read(filename);

      assert.that(json).is.equalTo({ version: '1.0.0' });
    });
  });

  suite('write', () => {
    test('is a function.', async () => {
      assert.that(dotFile.write).is.ofType('function');
    });

    test('throws an error when file name is missing.', async () => {
      await assert.that(async () => {
        await dotFile.write();
      }).is.throwingAsync('File name is missing.');
    });

    test('throws an error when JSON is missing.', async () => {
      await assert.that(async () => {
        await dotFile.write(filename);
      }).is.throwingAsync('JSON is missing.');
    });

    test('throws an error when the file name does not start with a dot.', async () => {
      await assert.that(async () => {
        await dotFile.write('foo', {});
      }).is.throwingAsync('File name does not start with a dot.');
    });

    test('writes the given JSON.', async () => {
      await dotFile.write(filename, { version: '1.0.0' });

      const json = await dotFile.read(filename);

      assert.that(json).is.equalTo({ version: '1.0.0' });
    });
  });
});
