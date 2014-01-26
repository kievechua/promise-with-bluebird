var Promise = require('bluebird');

// var carPromise = new Promise(function (resolve, reject) {
//     setTimeout(function () {
//         resolve([
//             {
//                 make: 'Proton',
//                 model: 'Wira'
//             },
//             {
//                 make: 'Proton',
//                 model: 'Saga'
//             }
//         ]);
//     });
// });

// var bikePromise = new Promise(function (resolve, reject) {
//     setTimeout(function () {
//         resolve([
//             {
//                 make: 'Kawasaki',
//                 model: 'Ninja 250'
//             },
//             {
//                 make: 'Kawasaki',
//                 model: 'Ninja 450'
//             }
//         ]);
//     });
// });

// Promise.all([carPromise, bikePromise])
// .then(function (vehicles) {
//     console.log(vehicles);
// });

// // or

// Promise.join(carPromise, bikePromise)
// .spread(function (cars, bikes) {
//     console.log(cars, bikes);
// });

Promise.map([1,2,3,4,5,6,7,8,9], function (item) {
    var defer = Promise.defer();
    defer.resolve(item);
    return defer.promise;
})
.then(function () {
    console.log(arguments);
});