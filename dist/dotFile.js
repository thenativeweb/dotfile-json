'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs'),
    os = require('os'),
    path = require('path');

var promisify = require('util.promisify');

var readFile = promisify(fs.readFile),
    writeFile = promisify(fs.writeFile);

var getFile = function getFile(filename) {
  if (!filename) {
    throw new Error('File name is missing.');
  }

  return path.join(os.homedir(), filename);
};

var dotFile = {
  read: function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(filename) {
      var file, data, json;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (filename) {
                _context.next = 2;
                break;
              }

              throw new Error('File name is missing.');

            case 2:
              if (filename.startsWith('.')) {
                _context.next = 4;
                break;
              }

              throw new Error('File name does not start with a dot.');

            case 4:
              file = getFile(filename);
              data = void 0;
              _context.prev = 6;
              _context.next = 9;
              return readFile(file, { encoding: 'utf8' });

            case 9:
              data = _context.sent;
              _context.next = 17;
              break;

            case 12:
              _context.prev = 12;
              _context.t0 = _context['catch'](6);

              if (!(_context.t0.code === 'ENOENT')) {
                _context.next = 16;
                break;
              }

              return _context.abrupt('return', {});

            case 16:
              throw _context.t0;

            case 17:
              json = JSON.parse(data);
              return _context.abrupt('return', json);

            case 19:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[6, 12]]);
    }));

    function read(_x) {
      return _ref.apply(this, arguments);
    }

    return read;
  }(),
  write: function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(filename, json) {
      var file, data;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (filename) {
                _context2.next = 2;
                break;
              }

              throw new Error('File name is missing.');

            case 2:
              if (json) {
                _context2.next = 4;
                break;
              }

              throw new Error('JSON is missing.');

            case 4:
              if (filename.startsWith('.')) {
                _context2.next = 6;
                break;
              }

              throw new Error('File name does not start with a dot.');

            case 6:
              file = getFile(filename);
              data = (0, _stringify2.default)(json);
              _context2.next = 10;
              return writeFile(file, data, { encoding: 'utf8' });

            case 10:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function write(_x2, _x3) {
      return _ref2.apply(this, arguments);
    }

    return write;
  }()
};

module.exports = dotFile;