
// const fs = require('fs/promises')

// const [, , filePath] = process.argv

// const folders = {
//     img: ['png', 'jpeg', 'jpg', 'jpng'],
//     audio: ['mp3'],
//     document: ['txt', 'pdf']
// }

// let folderPath = filePath === '.' || !filePath ? __dirname : filePath

// async function main() {
//     const dirs = await fs.readdir(folderPath)
//     console.log(dirs)
//     for (let dir of dirs) {
//         const ext = dir.split('.')[1]
//         console.log(ext,"ext")
//         if (folders.img.includes(ext?.toLocaleLowerCase())) {
//             if(dir !== 'images'){
//                 await fs.mkdir('images')
//             }
//             await fs.rename(`${folderPath}/${dir}`, `${folderPath}/images/${dir}`)
//         }

//         if (folders.audio.includes(ext?.toLocaleLowerCase())) {
//             // await fs.mkdir('audio')
//             await fs.rename(`${folderPath}/${dir}`, `${folderPath}/audio/${dir}`)
//         }

//         if (folders.document.includes(ext?.toLocaleLowerCase())) {
//             // await fs.mkdir('document')
//             await fs.rename(`${folderPath}/${dir}`, `${folderPath}/document/${dir}`)
//         }
//     }
// }

// main()



const http = require('http')
const url = require('url')
const queryString = require('querystring')
const {readFileAndParse, writeFileAndStringify} = require('./utils')

const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url)
    if(parsedUrl.pathname === '/' && req.method === 'GET'){
        // res.statusCode = 200
        res.writeHead(200, {
            'content-type': 'text/html'
        })
        res.end('hello world')
    }
    if(parsedUrl.pathname === '/html' && req.method === 'GET'){
        res.writeHead(200, {
            'content-type': 'text/html'
        })
        res.end(`
            <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1 style="color: red;">Hello world</h1>
</body>
</html>    
        `)
    }
    if(parsedUrl.pathname === '/users' && req.method === 'GET'){
        const users = await readFileAndParse('users.json', true)

        res.writeHead(200, { 
            'content-type': 'application/json'
        })

        res.end(JSON.stringify(users))
    }
    if(parsedUrl.pathname === '/echo' && req.method === 'POST'){
        let body = ''

        req.on('data', (chunk) => {
            console.log(chunk, "chink")
            body += chunk
        })

        req.on('end', () => {
            const parsedData = JSON.parse(body)
            console.log(parsedData, "body")
        })

        res.end('rame')
    }
    if(parsedUrl.path === '/users' && req.method === 'POST'){
        let body = ''
        let parsedData 

        req.on('data', (chunk) => {
            console.log(chunk, "chink")
            body += chunk
        })

        req.on('end', () => {
            parsedData = JSON.parse(body)
        })

        const users = await readFileAndParse('users.json', true)
        const lastId = users[users.length - 1]?.id || 0

        const newUser = {
            id: lastId+1,
            name: parsedData.name,
            email: parsedData.email
        }
        users.push(newUser)
        await writeFileAndStringify('users.json', users, true)

        res.writeHead(201, {
            'content-type': 'text/plain'
        })

        res.end('user craeted succesfuly')
    }
    if(parsedUrl.pathname === '/posts' && req.method === 'GET'){
        const query = queryString.parse(parsedUrl.query)
        let page = Number(query.page) || 1
        let take = Number(query.take) || 30
        take = Math.min(30, take)
        const start = (page - 1) * take
        const end = page * take
        const posts = await readFileAndParse('posts.json', true)

        res.writeHead(200, { 
            'content-type': 'application/json'
        })

        const obj = {
            page,
            take,
            data: posts.slice(start, end),
            total: posts.length
        }

        res.end(JSON.stringify(obj))
    }
})

server.listen(4000, () => {
    console.log('server running on http://localhost:4000')
})

