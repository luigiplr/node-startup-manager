var Promise = require('bluebird');
var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var util = require('util');

switch (process.platform) {
    case 'win64':
    case 'win32':
        var startupUtil =
            break;
    case 'linux':
        var startupUtil =
            break;
    case 'darwin':
        var startupUtil =
            break;
    default:
        return process.platform;
}




module.exports.addStartup = function(opts) {
    return OpenVPNManagement(cmd);
}

function OpenVPNManagement(cmd) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            if (connection) {
                resolve(connection.exec(cmd));
            }
        }, 1000);
    });
}

function OpenVPNLog() {
    connection.exec('log on all', function(logsResponse) {
        connection.exec('state on', function(logsResponse) {
            connection.on('console-output', function(response) {

                _.each(response.split("\n"), function(res) {
                    if (res && res.substr(1, 5) == 'STATE') {
                        openvpnEmitter.emit('state-change', res.substr(7).split(","));
                    } else if ((res && res.substr(1, 5) == 'FATAL') || (res && res.substr(1, 5) == 'ERROR')) {
                        openvpnEmitter.emit('error', res.substr(7));
                    } else if (res && res.substr(1, 9) == 'BYTECOUNT') {
                        openvpnEmitter.emit('bytecount', res.substr(11).split(","));
                    } else {
                        if (res.length > 0) {
                            openvpnEmitter.emit('console-output', res);
                        }
                    }
                });

            });
        });
    });
}
