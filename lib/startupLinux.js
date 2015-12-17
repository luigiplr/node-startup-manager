import path from 'path';
import Promise from 'bluebird';
import fs from 'fs';
import util from 'util';


module.exports = {
    enableStartOnBoot(opts) {
            return new Promise((resolve, reject) => {
                const filepath = path.normalize(path.join(process.env.HOME, '.config/autostart/', opts.appName + '.desktop'));
                fs.writeFile(filepath, util.format('Type=Application\nName=%s\nExec=%s\nX-GNOME-Autostart-enabled=true', opts.appName, opts.appPath), err => {
                    if (err)
                        return reject(err);
                    resolve(true);
                });
            });
        },
        disableStartOnBoot(appName) {
            return new Promise((resolve, reject) => {
                const filepath = path.normalize(path.join(process.env.HOME, '.config/autostart/', appName + '.desktop'));
                fs.unlink(filepath, err => {
                    if (err)
                        return reject(err);
                    resolve(true);
                });
            });
        },
        statusStartOnBoot(appName) {
            return new Promise((resolve) => {
                const filepath = path.normalize(path.join(process.env.HOME, '.config/autostart/', appName + '.desktop'));
                fs.lstat(filepath, (err, stats) => {
                    if (err)
                        return resolve(false);
                    resolve(stats ? true : false);
                });
            });
        }
};