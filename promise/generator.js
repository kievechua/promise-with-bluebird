// WIP
var getData = Promise.coroutine(
    function* (urlA, urlB) {
        [resultA, resultB] = yield [
            http.getAsync(urlA), http.getAsync(urlB)
        ];
    }
);