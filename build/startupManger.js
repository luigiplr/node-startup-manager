'use strict';

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var startupUtil;
try {
    switch (process.platform) {
        case 'win64':
        case 'win32':
            startupUtil = require('./startupWin');
            break;
        case 'linux':
            startupUtil = require('./startupLinux');
            break;
        case 'darwin':
            startupUtil = require('./startupMac');
            break;
        default:
            startupUtil = 'Unsupported Platform: ' + process.platform;
    }
} catch (e) {
    startupUtil = 'Unsupported Platform: ' + process.platform;
}

module.exports = {
    add: function add(opts) {
        var _this = this;

        if (typeof startupUtil !== 'string') return startupUtil.enableStartOnBoot(opts.name, opts.path, opts.arguments);else return new _bluebird2.default(function (reject) {
            return reject.bind(_this, startupUtil);
        });
    },
    remove: function remove(appName) {
        var _this2 = this;

        if (typeof startupUtil !== 'string') return startupUtil.disableStartOnBoot(appName);else return new _bluebird2.default(function (reject) {
            return reject.bind(_this2, startupUtil);
        });
    },
    check: function check(appName) {
        var _this3 = this;

        if (typeof startupUtil !== 'string') return startupUtil.statusStartOnBoot(appName);else return new _bluebird2.default(function (reject) {
            return reject.bind(_this3, startupUtil);
        });
    }
};