var startupManager = require('../index');


startupManager.remove('node-startup-manager Test')
	.then(console.log.bind(this, 'Startup item removed!'))
	.catch(console.error)