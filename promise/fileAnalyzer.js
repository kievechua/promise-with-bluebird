// More like real world example

var Promise = require('bluebird'),
    fs = Promise.promisifyAll(require('fs'));

module.exports = function analyze(directories, options, next) {
    var directoriesPromises,
        promise,
        promises = [];

    if (typeof(directories) === 'string') {
        directories = [directories];
    } else if (!Array.isArray(directories)) {
        throw new Error('Directories must be array');
    }

    if (typeof(options) == 'function') {
        next = options;
    } else if (options && options.debug) {
        Promise.longStackTraces();
    }

    // Get user insert file/directory list
    directoriesPromises = directories.map(function (directory) {
        return fs.readdirAsync(directory);
    });

    promise = Promise
        .all(directoriesPromises)
        // Combine multiple result
        .reduce(function (directory, direct) {
            return directory.concat(direct);
        })
        // Reformat data to return file type only
        .map(function (file) {
            var filePartial = file.split('.');

            return filePartial.length > 1 ? filePartial[filePartial.length - 1] : null;
        })
        // Filter out directory
        .filter(function (fileType) {
            return fileType;
        })
        // Calculate occurence of each file types
        .reduce(function (total, current) {
            if (typeof(total) === 'string') {
                total = {};
            }

            if (!total[current]) {
                total[current] = 1;
            }

            total[current]++;

            return total;
        })
        // Write result to a file
        .then(function (result) {
            console.log('success -----------');

            fs.writeFile('./result.json', JSON.stringify(result, null, 4));

            return result;
        })
        // Throw error so user can handle it on their side
        .catch(function (error) {
            console.log('error -------------');

            fs.writeFile('./error.json', JSON.stringify(error, null, 4));

            throw new Error(error);
        });

    // Supply callback if user pass in.
    if (next && typeof(next) === 'function') {
        promise.nodeify(next);
    }

    return promise;
};