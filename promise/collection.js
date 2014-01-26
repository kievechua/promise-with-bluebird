var Promise = require('bluebird');

// Will be catch by TypeError catch
new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve([1, 2, 3, 4, 5, 6]);
    }, 1000);
})
.filter(function (number) {
    return number % 2;
})
.map(function (number) {
    return number * 2;
})
.reduce(function (total, number) {
    return total + number;
})
.then(function (total) {
    console.log(total);
});
