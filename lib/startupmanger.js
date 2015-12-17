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
                return startupUtil.enableStartOnBoot(opts.name, opts.path, opts.arguments);
            else
                return new Promise(reject => reject.bind(this, startupUtil));
        },
        remove(appName) {
            if (typeof startupUtil !== 'string')
                return startupUtil.disableStartOnBoot(appName);
            else
                return new Promise(reject => reject.bind(this, startupUtil));
        },
        check(appName) {
            if (typeof startupUtil !== 'string')
                return startupUtil.statusStartOnBoot(appName);
            else
                return new Promise(reject => reject.bind(this, startupUtil));
        }
}