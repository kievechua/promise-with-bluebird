var qFile, bFile, promise,
    Promise = require('bluebird'),
    Q = require('q'),
    FS = require('fs'),
    fs = Promise.promisifyAll(FS);

qFile = Q.nfcall(FS.readFile, 'package.json', 'utf-8');
bFile = fs.readFileAsync('package.json', 'utf-8');

promise = Promise
    .join(qFile, bFile)
    .spread(function (q, b) {
        console.log(q, b);
    });
