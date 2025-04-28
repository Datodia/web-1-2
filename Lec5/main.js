

// const [,, operation, val1, val2, ] = process.argv

// if(operation === 'add'){
//     console.log(Number(val1) + Number(val2))
// }

// process.on('exit', () => {
//     console.log('on exit')
// })


// console.log(1)


// setTimeout(() => {
//     console.log(2)
// }, 1000)

// process.exit()
// console.log(3)

// const os = require('os')

// console.log(os.freemem() / 1024 / 1024, "os")


// const fs = require('fs')

// fs.readFile('second.txt', 'utf-8', (err, data) => {
//     if(err){
//         console.log(err)
//         return
//     }
//     console.log(data, "read data")

//     fs.readFile('first.txt', 'utf-8', (err, data) => {
//         if(err){
//             console.log(err)
//             return
//         }
    
//         console.log(data, "read data")
//     })

// })

// const data2 = fs.readFileSync('second.txt', 'utf-8')
// console.log(data2)
 
// const data1 = fs.readFileSync('first.txt', 'utf-8')

// console.log(data1)

//  read all numbers from file calculate sum of all 
// this number and then write it into other file

const fs = require('fs/promises')

async function main() {
    // const first = await fs.readFile('first.txt', 'utf-8')
    // console.log(first)
    // const second = await fs.readFile('second.txt', 'utf-8')

    // console.log(second)
    // const readData = await fs.readFile('third.txt', 'utf-8')
    const user = {
        name: "giorgi",
        age: 20,
        isSmoker: false
    }
    await fs.writeFile('user.json', JSON.stringify({user}))
    console.log('writed successfully')
}

// main()

// async function foo(){
//     const numbers = await fs.readFile('numbers.txt', 'utf-8')
//     // const result = numbers.split(' ').map(el => Number(el)).reduce((tot, cur)=> tot + cur, 0)
//     // const result = numbers.split(' ').reduce((tot, cur)=> tot + Number(cur), 0)
//     let result = 0
//     numbers.split(' ').forEach(el => {
//         result += Number(el)
//     })
//     console.log(result)
//     await fs.writeFile('result.txt', String(result))
// }
// foo()


// Create CLI tool where you can manage users
// node main.js add giorgi 20 => u should add new object in users.json
// node main.js show =s> list of all users [{name: 'asd' }]

const [,,command, userName, userAge] = process.argv
async function main2(){
    const data = await fs.readFile('user.json', 'utf-8')
    if(command === 'add'){
        const users = JSON.parse(data)
        const newUser = {
            name: userName,
            age: userAge
        }
        users.push(newUser)
        await fs.writeFile('user.json', JSON.stringify(users))
    }

    if(command === 'show'){
        console.log(JSON.parse(data))
    }
}
 
main2()