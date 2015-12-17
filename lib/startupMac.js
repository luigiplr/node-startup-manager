import Promise from 'bluebird';
import applescript from 'applescript';

const tellTo = 'tell application "System Events" to ';


module.exports = {
    enableStartOnBoot(name = '', appPath, appArguments = []) {
            return new Promise((resolve, reject) => {
                var command = tellTo + 'make login item at end with properties {path:"' + appPath + '", hidden:false, name:"' + name + '"}';
                applescript.execString(command, function(err, rtn) {
                    if (err)
                        return reject(err)
                    else
                        resolve(rtn);
                });
            });
        },
        disableStartOnBoot(appName) {
            return new Promise((resolve, reject) => {
                var command = tellTo + 'delete every login item whose name is "' + appName + '"';
                applescript.execString(command, (err, rtn) => {
                    if (err)
                        return reject(err)
                    else
                        resolve(rtn);
                });
            });
        },
        statusStartOnBoot(appName) {
            return new Promise((resolve, reject) => {
                var command = tellTo + 'get the name of every login item';
                applescript.execString(command, (err, loginItems) => {
                    if (err)
                        return reject(err);
                    if (loginItems == null)
                        resolve(false);
                    else
                        resolve(loginItems.indexOf(appName) > -1);
                });
            });
        }
};