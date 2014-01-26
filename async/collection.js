var async = require('async');
var fs = require('fs');

async.concat(
    ['./promise', './async'],
    fs.readdir,
    function (err, results) {
        var result = results.map(function (file) {
            var filePartial = file.split('.');

            return filePartial.length > 1 ? filePartial[filePartial.length - 1] : null;
        })
        .filter(function (fileType) {
            return fileType;
        })
        // Calculate occurence of each file types
        .reduce(function (total, current) {
            if (typeof(total) === 'string') {
                total = {};
            }

            total[current] = total[current] ? total[current] + 1 : 1;

            return total;
        });

        console.log(result);
    }
);