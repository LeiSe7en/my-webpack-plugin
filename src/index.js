const logger = require('./log.js')
const Car = require('./Car.js')

const newCar = new Car()

// newCar.hooks.brake.tap('LoggerPlugin', new logger().log)
newCar.hooks.testAsyncSeriesHook.tap('LoggerPlugin', new logger().route)

newCar.hooks.testAsyncSeriesHook.tapPromise('TestTapPromise', (source, target) => {
	return Promise.resolve('From TestTapPromise')
})

newCar.hooks.testAsyncWaterfall.tapPromise('TestTapPromise', (source, target) => {
	console.log('tapped method 1')
	return Promise.resolve('hahhah')
})

newCar.hooks.testAsyncWaterfall.tapPromise('TestTapPromise', (source, target) => {
	console.log(source, target)
	return Promise.resolve('From testAsyncWaterfall')
})

// newCar.brake()


// newCar.testAsyncSeriesHook()
newCar.testAsyncWaterfall()