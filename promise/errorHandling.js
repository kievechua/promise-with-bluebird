var Promise = require('bluebird'),
    fs = Promise.promisifyAll(require('fs'));

// Will be catch by TypeError catch
new Promise(function (resolve, reject) {
    var notFunction = 'Not function';

    notFunction();
})
.catch(TypeError, function (error) {
    console.log('TypeError', error);
})
.catch(function (error) {
    console.log('error', error);
});

// Will be catch by .catch
fs.readFileAsync('myfile.json')
.error(function (error) {
    console.log('error', error);
})
.catch(function (error) {
    console.log('catch', error);
});

// Will be catch by .error
new Promise(function (resolve, reject) {
    setTimeout(function () {
        reject('some error');
    }, 1000);
})
.error(function (error) {
    console.log('error', error);
})
.catch(function (error) {
    console.log('catch', error);
});

/**
    Custom error
*/
function MyCustomError(message) {
    this.message = message;
    this.name = 'MyCustomError';

    Error.captureStackTrace(this, MyCustomError);
}

MyCustomError.prototype = Object.create(Error.prototype);
MyCustomError.prototype.constructor = MyCustomError;

Promise.resolve()
.then(function(){
    throw new MyCustomError('Custom error message');
})
.catch(MyCustomError, function (error) {
    console.log('Throw by custom error', error);
});
