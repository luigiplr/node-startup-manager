import Winreg from 'winreg';
import Promise from 'bluebird';

const regKey = new Winreg({
    hive: Winreg.HKCU,
    key: '\\Software\\Microsoft\\Windows\\CurrentVersion\\Run'
});

module.exports = {
    enableStartOnBoot(name = '', path, appArguments = []) {
            return new Promise((resolve, reject) => {
                try {
                    regKey.set(name, Winreg.REG_SZ, '\"' + path + ((appArguments.length > 0) ? (' ' + appArguments.split(' ')) : '') + '\"', resolve);
                } catch (e) {
                    reject(e);
                }
            });
        },
        disableStartOnBoot(appName) {
            return new Promise(resolve => regKey.remove.bind(this, appName, resolve));
        },
        statusStartOnBoot(appName) {
            return new Promise(resolve => {
                regKey.get(appName, (error, item) => {
                    resolve(item !== null);
                });
            });
        }
};