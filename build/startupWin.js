'use strict';

var _winreg = require('winreg');

var _winreg2 = _interopRequireDefault(_winreg);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var regKey = new _winreg2.default({
    hive: _winreg2.default.HKCU,
    key: '\\Software\\Microsoft\\Windows\\CurrentVersion\\Run'
});

module.exports = {
    enableStartOnBoot: function enableStartOnBoot() {
        var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var appPath = arguments[1];
        var appArguments = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

        return new _bluebird2.default(function (resolve, reject) {
            try {
                regKey.set(name, _winreg2.default.REG_SZ, '\"' + appPath + '\"' + (appArguments.length > 0 ? ' ' + appArguments.join(' ') : ''), resolve);
            } catch (e) {
                reject(e);
            }
        });
    },
    disableStartOnBoot: function disableStartOnBoot(appName) {
        return new _bluebird2.default(function (resolve, reject) {
            try {
                regKey.remove(appName, resolve);
            } catch (e) {
                reject(e);
            }
        });
    },
    statusStartOnBoot: function statusStartOnBoot(appName) {
        return new _bluebird2.default(function (resolve) {
            regKey.get(appName, function (error, item) {
                resolve(item !== null);
            });
        });
    }
};