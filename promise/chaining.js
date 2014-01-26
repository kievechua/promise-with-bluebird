var Promise = require('bluebird'),
    fs = Promise.promisifyAll(require('fs'));

fs.readFileAsync('./package.json', 'utf-8')
.then(function (content1) {
    return fs.readFileAsync('./package.json', 'utf-8')
        .then(function (content2) {
            return [content1, content2];
        });
})
.then(function (content) {
    console.log(content);
});
