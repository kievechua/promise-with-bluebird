var Promise = require('bluebird'),
    fs = Promise.promisifyAll(require('fs'));

var someModule = function (next) {
    promise = new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve('success');
        }, 1000);
    });

    if (next) {
        promise.nodeify(next);
    }

    return promise;
};

someModule().then(function (result) {
    console.log('promise', result);
});

someModule(function (error, result) {
    console.log('callback', result);
});