import Winreg from 'winreg';
import Promise from 'bluebird';

const regKey = new Winreg({
    hive: Winreg.HKCU,
    key: '\\Software\\Microsoft\\Windows\\CurrentVersion\\Run'
});

module.exports = {
    enableStartOnBoot(opts) {
            return new Promise((resolve, reject) => {
                try {
                    regKey.set(opts.appName, Winreg.REG_SZ, '\"' + opts.appPath + '\"', resolve);
                } catch (e) {
                    reject(e);
                }
            });
        },
        disableStartOnBoot(appName) {
            return new Promise(resolve => {
                regKey.remove(appName, resolve);
            });
        },
        statusStartOnBoot(appName) {
            return new Promise(resolve => {
                regKey.get(appName, (error, item) => {
                    resolve(item !== null);
                });
            });
        }
};