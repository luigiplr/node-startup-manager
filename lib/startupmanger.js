import Promise from 'bluebird';

switch (process.platform) {
    case 'win64':
    case 'win32':
        var startupUtil = require('./startupWin');
        break;
    case 'linux':
        var startupUtil = require('./startupLinux');
        break;
    case 'darwin':
        var startupUtil = require('./startupMac');
        break;
    default:
        var startupUtil = 'Unsupported Platform: ' + process.platform;
}


module.exports.addStartup = function(opts) {
    if (typeof startupUtil !== 'string')
        return startupUtil.enableStartOnBoot(opts);
    else
        return new Promise(function(reject) {
            reject(startupUtil);
        });
};

module.exports.removeStartup = function(opts) {
    if (typeof startupUtil !== 'string')
        return startupUtil.disableStartOnBoot(opts);
    else
        return new Promise(function(reject) {
            reject(startupUtil);
        });
};

module.exports.checkStartup = function(opts) {
    if (typeof startupUtil !== 'string')
        return startupUtil.statusStartOnBoot(opts);
    else
        return new Promise(function(reject) {
            reject(startupUtil);
        });
};
