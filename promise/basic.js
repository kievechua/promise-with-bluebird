function someFunction() {
    var defer = Promise.defer();

    setTimeout(function(){
        defer.resolve('Done');
    }, 1000);

    return defer.promise;
}

someFunction.then(function (result) {
    console.log(result);
});

