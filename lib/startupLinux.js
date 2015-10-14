import path from 'path';
import Promise from 'bluebird';
import fs from 'fs';
import util from 'util';


module.exports = {
    enableStartOnBoot: function(opts) {
        return new Promise((resolve, reject) => {
            var filepath = path.normalize(path.join(process.env.HOME, '.config/autostart/', opts.appName + '.desktop'));
            fs.writeFile(filepath, util.format('Type=Application\nName=%s\nExec=%s\nX-GNOME-Autostart-enabled=true', opts.appName, opts.appPath), function(err) {
                if (err)
                    return reject(err);
                resolve(true);
            });
        });
    },
    disableStartOnBoot: function(appName) {
        return new Promise((resolve, reject) => {
            var filepath = path.normalize(path.join(process.env.HOME, '.config/autostart/', appName + '.desktop'));
            fs.unlink(filepath, function(err) {
                if (err)
                    return reject(err);
                resolve(true);
            });
        });
    },
    statusStartOnBoot: function(appName) {
        return new Promise((resolve) => {
            var filepath = path.normalize(path.join(process.env.HOME, '.config/autostart/', appName + '.desktop'));
            fs.lstat(filepath, function(err, stats) {
                if (err)
                    return resolve(false);
                resolve(stats ? true : false);
            });
        });
    };
};
