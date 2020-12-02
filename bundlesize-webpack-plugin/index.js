module.exports = class BundlesizeWebpackPlugin {
	constructor (options) {
		this.options = options
	}
	//Every webpack plugin must have an apply method in them which is called by webpack
	apply (compiler) {
		// compiler is given by webpack which is an instance of compiler
		console.log("FROM BUNDLESIZE PLUGIN")
	}
}