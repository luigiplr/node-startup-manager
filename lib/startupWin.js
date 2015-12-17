import Winreg from 'winreg';
import Promise from 'bluebird';

const regKey = new Winreg({
    hive: Winreg.HKCU,
    key: '\\Software\\Microsoft\\Windows\\CurrentVersion\\Run'
});

module.exports = {
    enableStartOnBoot(name = '', appPath, appArguments = []) {
            return new Promise((resolve, reject) => {
                try {
                    regKey.set(name, Winreg.REG_SZ, '\"' + appPath + ((appArguments.length > 0) ? (' ' + appArguments.join(' ')) : '') + '\"', resolve);
                } catch (e) {
                    reject(e);
                }
            });
        },
        disableStartOnBoot(appName) {
            return new Promise((resolve, reject) => {
                try {
                    regKey.remove(appName, resolve);
                } catch (e) {
                    reject(e);
                }
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