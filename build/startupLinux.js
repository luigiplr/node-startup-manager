'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
    enableStartOnBoot: function enableStartOnBoot() {
        var name = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
        var appPath = arguments[1];
        var appArguments = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];

        return new _bluebird2.default(function (resolve, reject) {
            var filepath = _path2.default.normalize(_path2.default.join(process.env.HOME, '.config/autostart/', name + '.desktop'));
            _fs2.default.writeFile(filepath, _util2.default.format('Type=Application\nName=%s\nExec=%s\nX-GNOME-Autostart-enabled=true', name, appPath + (appArguments.length > 0 ? ' ' + appArguments.join(' ') : '')), function (err) {
                if (err) return reject(err);
                resolve(true);
            });
        });
    },
    disableStartOnBoot: function disableStartOnBoot(appName) {
        return new _bluebird2.default(function (resolve, reject) {
            var filepath = _path2.default.normalize(_path2.default.join(process.env.HOME, '.config/autostart/', appName + '.desktop'));
            _fs2.default.unlink(filepath, function (err) {
                if (err) return reject(err);
                resolve(true);
            });
        });
    },
    statusStartOnBoot: function statusStartOnBoot(appName) {
        return new _bluebird2.default(function (resolve) {
            var filepath = _path2.default.normalize(_path2.default.join(process.env.HOME, '.config/autostart/', appName + '.desktop'));
            _fs2.default.lstat(filepath, function (err, stats) {
                if (err) return resolve(false);
                resolve(stats ? true : false);
            });
        });
    }
};