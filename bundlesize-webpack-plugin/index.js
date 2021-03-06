const fs = require('fs')
const {resolve} = require('path')
const { SyncHook, AsyncParallelHook } = require('tapable')
const formatBytes = function (bytes) {
	const k = 1024 // 1kb
	// Math.log(bytes) / Math.log(k) 就是看看bytes是k的多少次方
	// 最后得到的i就是最后结果的整数部分，但是需要再确定单位
	const i = Math.floor(Math.log(bytes) / Math.log(k))
	const sizes = ['B', 'Kb', 'Mb', 'Gb']
	return {
		bundleSize: parseFloat(bytes / Math.pow(k, i)).toFixed(2),
		fullInfo: parseFloat(bytes / Math.pow(k, i)).toFixed(2) + '' + sizes[i]
	}
}

class BundlesizeWebpackPlugin {
	constructor (options) {
		this.options = options || { sizeLimit: 3 }
		this.hooks = {
			emitSize: new SyncHook(['size'])
		}
	}
	//Every webpack plugin must have an apply method in them which is called by webpack
	apply (compiler) {
		// compiler is given by webpack which is an instance of compiler
		// 这个tap方法的name 参数需要mean something. 原因是为了在stacktrace 的时候方便知道是哪个plugin
		compiler.hooks.done.tap('BundleSizeWebpackPlugin', stats => {
			const { path, filename } = stats.compilation.options.output
			const bundlePath = resolve(path, filename)
			const { size } = fs.statSync(bundlePath)
			const { bundleSize, fullInfo } = formatBytes(size)
			if (bundleSize < this.options.sizeLimit) {
				this.hooks.emitSize.call(bundleSize)
			}
		})

		compiler.hooks.emit.tapAsync('test emit async hook', (compilation, callback) => {
			const compilationHash = compilation.hash
			console.log(compilation.mainTemplate.getPublicPath({ hash: compilationHash }))
		})
	}

	setSize () {

	}
}

module.exports = BundlesizeWebpackPlugin