node-startup-manager
--------------

[![npm version](https://badge.fury.io/js/node-startup-manager.svg)](http://badge.fury.io/js/node-startup-manager)


Manage Startup tasks for OSX, Windows & Linux ([Ubuntu](http://www.ubuntu.com) & [distros based off of Ubuntu](http://www.omgubuntu.co.uk/2014/06/5-ubuntu-based-distros-better-than-the-real-thing)) for [Node.js](http://nodejs.org) apps.

Installation
-------

```bash
$ npm install node-startup-manager --save
```

Code example
-------

```js
var startupManager = require('node-startup-manager');

var opts = {
    path: 'C:/Program Files/RealVNC/VNC Server/vncserver.exe', // Path to app.
    name: 'My_Awesome_App', // What your app shows up in startup list.
    arguments: ['--dev', '--minimized'] // (optional) Arguments applyed to app on startup (Linux & Windows only for now).
};

startupManager.add(opts)
    .then(function() {
        console.log('App added to startup')
    })
    .catch(function(e) {
        Console.log('Something went wrong; Perms?', e)
    });

startupManager.remove('My_Awesome_App')
    .then(function() {
        console.log('App removed from startup')
    })
    .catch(function(e) {
        Console.log('Something went wrong; Perms?', e)
    });

startupManager.check('My_Awesome_App')
    .then(function(status) {
        console.log('App statup status:', status) // status returned as a boolen
    });

```

Support
-------

If you're having any problem, please [raise an issue](https://github.com/luigiplr/node-startup-manager/issues/new) on GitHub and I'll  be happy to help.

Contribute
----------

- Issue Tracker: [github.com/luigiplr/node-startup-manager/issues](https://github.com/luigiplr/node-startup-manager/issues)
- Source Code: [github.com/luigiplr/node-startup-manager](https://github.com/luigiplr/node-startup-manager)



License
-------

The project is licensed under the GPL-3.0 license.
