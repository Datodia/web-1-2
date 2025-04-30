
// [
//     {
//         id: 1,
//         title: "title1",
//         content: "conten1",
//         createAt: '2025 April 30 09:55:33'
//     }
// ]

const fs = require('fs/promises')
const path = require('path')
const moment = require('moment')

async function main(){
    const [,,command, title, content] = process.argv

    const raedData = await fs.readFile('posts.json', 'utf-8')
    const posts = JSON.parse(raedData)

    if(command === 'add'){
        const id = posts[posts.length - 1]?.id || 0

        const newPost = {
            id: id+1,
            title,
            content,
            createdAt: moment().format('YYYY MM DD HH:MM:SS')
        }
        posts.push(newPost)
        await fs.writeFile('posts.json', JSON.stringify(posts))
    }
    if(command === 'show'){
        console.log(posts)
    }

    if(command === 'delete'){
        const index = posts.findIndex(el => el.id === Number(title))
        if(index === -1){
            console.log('cant delete')
            return
        }
        const deletedItem = posts.splice(index, 1)
        await fs.writeFile('posts.json', JSON.stringify(posts))
        console.log('deleted ' + deletedItem[0])
    }
}

main()


// async function main(){
    // await fs.mkdir('test')
    // for(let i = 1; i <= 10; i++){
    //     await fs.rmdir(`${i}`)
    // }
    // await fs.rename('test.txt', 'new.txt')

    // await fs.copyFile('new.txt', 'new2.txt')
    // const dirs = await fs.readdir(__dirname)
    // for(let dir of dirs){
    //     const stat = await fs.stat(dir)
    //     if(stat.isDirectory()){
    //         await fs.appendFile(`new.txt`, `Dir: ${dir}\n`)
    //     }else{
    //         await fs.appendFile(`new.txt`, `File: ${dir}\n`)
    //     }
    // }
// }


// main()


// async function foo(fullPath){
//     const dirs = await fs.readdir(fullPath)
//     for(let dir of dirs){
//         const stat = await fs.stat(path.join(fullPath, dir))
//         if(stat.isDirectory()){
//             await fs.appendFile('new2.txt', `Dir: ${dir}\n`)
//             const absolutePath = path.join(fullPath, dir)
//             foo(absolutePath)
//         }else{
//             await fs.appendFile('new2.txt', ` -File: ${dir}\n`)
//         }
//     }
// }

// foo(__dirname)
