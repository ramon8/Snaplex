const { createDirectoryIfNeeded, copyFile, capitalizeFirstLetter } = require('./utils.cjs')
const fs = require('fs')

const myArgs = process.argv.slice(2)

const template = myArgs[0]
const name = myArgs[1]

const currentDir = process.env.PWD
const validTemplates = ['component', 'slice']

const templatesLocations = {
    component: `${__dirname}\\..\\..\\apps\\snaplex-app\\src\\app\\components`,
    slice: `${__dirname}\\..\\..\\apps\\snaplex-app\\src\\app\\store\\slices`,
}

if (!validTemplates.includes(template)) throw Error("This template does not exist")
if (!name) throw Error("Name is not valid")

const sourceDir = `${__dirname}\\templates\\${template}`

const destinationDir = `${templatesLocations[template]}\\${name}`

fs.readdir(sourceDir, function (err, files) {
    const allFilesNames = [];

    if (err) { return console.log('Unable to scan directory: ' + err) }

    files.forEach(file => { allFilesNames.push(file) });

    files.forEach(file => {
        const sourceFile = `${sourceDir}\\${file}`

        let fileName = file.replace(/test/g, name)
        fileName = fileName.replace(/Test/g, capitalizeFirstLetter(name))

        const destinationFile = `${destinationDir}\\${fileName}`

        createDirectoryIfNeeded(`${destinationDir}`)
        copyFile(sourceFile, destinationFile, name)
    });

});
