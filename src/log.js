module.exports = class Logger {
	log () {
		console.log('Bibu Bibu Bibu. Car brakes')
	}

	route (source, target) {
		console.log('Di Di Di. Calculating route\n', `${source} to ${target}`)
	}
}