import Promise from 'bluebird';
import applescript from 'applescript';

var tellTo = 'tell application "System Events" to ';


module.exports = {
    enableStartOnBoot: function(opts) {
        return new Promise((resolve, reject) => {
            var properties = "{path:\"" + opts.appPath + "\", name:\"" + opts.appName + "\"}";
            var command = tellTo + 'make login item at end with properties ' + properties;
            applescript.execString(command, function(err, rtn) {
                if (err)
                    return reject(err)
                else
                    resolve(rtn);
            });
        });
    },
    disableStartOnBoot: function(appName) {
        return new Promise((resolve, reject) => {
            var command = tellTo + ("delete login item \"" + appName + "\"");
            applescript.execString(command, function(err, rtn) {
                if (err)
                    return reject(err)
                else
                    resolve(rtn);
            });
        });
    },
    statusStartOnBoot: function(appName) {
        return new Promise((resolve, reject) => {
            var command = tellTo + "get the name of every login item";
            applescript.execString(command, function(err, loginItems) {
                if (err)
                    return reject(err);

                if (loginItems == null)
                    resolve(false);
                else
                    resolve(loginItems.indexOf(opts.appName) > -1);
            });
        });
    };
};
