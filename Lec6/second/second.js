const fs = require('fs/promises')
const path = require('path')

console.log(__dirname)

async function main(){
    // await fs.writeFile('../test/second.txt', 'second')
    const fullPath = path.join(__dirname, '..', 'test', 'second.txt')
    await fs.writeFile(fullPath, 'second')
}

main()