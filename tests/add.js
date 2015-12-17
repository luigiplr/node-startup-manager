var startupManager = require('../index');


startupManager.add({
		name: 'node-startup-manager Test',
		path: process.execPath,
		arguments: ['--test', '--dev=2']
	})
	.then(console.log.bind(this, 'Startup item added!'))
	.catch(console.error)