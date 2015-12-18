'use strict';

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _applescript = require('applescript');

var _applescript2 = _interopRequireDefault(_applescript);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tellTo = 'tell application "System Events" to ';

module.exports = {
    enableStartOnBoot: function enableStartOnBoot() {
        var name = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
        var appPath = arguments[1];
        var appArguments = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];

        return new _bluebird2.default(function (resolve, reject) {
            var command = tellTo + 'make login item at end with properties {path:"' + appPath + '", hidden:false, name:"' + name + '"}';
            _applescript2.default.execString(command, function (err, rtn) {
                if (err) return reject(err);else resolve(rtn);
            });
        });
    },
    disableStartOnBoot: function disableStartOnBoot(appName) {
        return new _bluebird2.default(function (resolve, reject) {
            var command = tellTo + 'delete every login item whose name is "' + appName + '"';
            _applescript2.default.execString(command, function (err, rtn) {
                if (err) return reject(err);else resolve(rtn);
            });
        });
    },
    statusStartOnBoot: function statusStartOnBoot(appName) {
        return new _bluebird2.default(function (resolve, reject) {
            var command = tellTo + 'get the name of every login item';
            _applescript2.default.execString(command, function (err, loginItems) {
                if (err) return reject(err);
                if (loginItems == null) resolve(false);else resolve(loginItems.indexOf(appName) > -1);
            });
        });
    }
};