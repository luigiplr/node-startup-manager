import Promise from 'bluebird';

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
    add(opts) {
            if (typeof startupUtil !== 'string')
                return startupUtil.enableStartOnBoot(opts);
            else
                return new Promise(reject => reject.bind(this, startupUtil));
        },

        remove(appName) {
            if (typeof startupUtil !== 'string')
                return startupUtil.disableStartOnBoot(opts);
            else
                return new Promise(reject => reject.bind(this, startupUtil));
        },

        check(appName) {
            if (typeof startupUtil !== 'string')
                return startupUtil.statusStartOnBoot(opts);
            else
                return new Promise(reject => reject.bind(this, startupUtil));
        }
}