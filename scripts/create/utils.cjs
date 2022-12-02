const fs = require('fs')

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const createDirectoryIfNeeded = (directory) => {
    fs.mkdir(directory, { recursive: true }, (err) => {
        if (err) throw err;
    });
}

const copyFile = (sourceFile, destinationFile, name) => {
    fs.copyFile(sourceFile, destinationFile, (err) => {
        if (err) throw err;
        fs.readFile(destinationFile, 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }
            var result = data.replace(/test/g, name);
            result = result.replace(/Test/g, capitalizeFirstLetter(name));

            fs.writeFile(destinationFile, result, 'utf8', function (err) {
                if (err) return console.log(err);
            });
        });
    });
}

module.exports = {
    capitalizeFirstLetter,
    createDirectoryIfNeeded,
    copyFile
}