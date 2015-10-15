var Promise = require('bluebird');
var applescript = require('applescript');

var tellTo = 'tell application "System Events" to ';


module.exports = {
    enableStartOnBoot: function(opts) {
        return new Promise((resolve, reject) => {
            var command = tellTo + 'make login item at end with properties {path:"' + opts.appPath + '", hidden:false, name:"' + opts.appName + '"}';
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
            var command = tellTo + 'delete every login item whose name is "' + appName + '"';
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
            var command = tellTo + 'get the name of every login item';
            applescript.execString(command, function(err, loginItems) {
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
