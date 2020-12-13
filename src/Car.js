const { SyncHook, AsyncSeriesHook, AsyncSeriesWaterfallHook } = require('tapable')
const target = 'Shanghai', source = 'Beijing'
class Car {
	constructor () {
		this.hooks = {
			brake: new SyncHook(),
			testAsyncSeriesHook: new AsyncSeriesHook(['source', 'target']),
			testAsyncWaterfall: new AsyncSeriesWaterfallHook(['source', 'target'])
		}
	}

	brake () {
		console.log('This car do brake')
		this.hooks.brake.call()
	}

	testAsyncSeriesHook () {
		console.log('Calculating route...')
		this.hooks.testAsyncSeriesHook.promise(source, target).then(res => {
			console.log(res)
		})
	}

	testAsyncWaterfall () {
		console.log('Calculating route...')
		// 这个 this.hooks.findRouteAsyncWaterfall.promise(source, target) 拿到的就是taped的方法返回的promise
		this.hooks.testAsyncWaterfall.promise(source, target).then(res => {
			console.log('testAsyncWaterfall', res)
		})
	}
}

module.exports = Car