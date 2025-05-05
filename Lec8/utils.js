const fs = require('fs/promises')

const readFileAndParse = async (filePath, parse) => {
    if(!filePath) return
    const readData = await fs.readFile(filePath, 'utf-8')

    return parse ? JSON.parse(readData) : readData
}

const writeFileAndStringify = async (filePath, data, stringify) => {
    if(!filePath) return
    const readData = stringify ? JSON.stringify(data) : data

    await fs.writeFile(filePath, readData)
    console.log('writed successfully')
}


module.exports = {readFileAndParse, writeFileAndStringify}