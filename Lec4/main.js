

// const myPromise1 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve(1)
//     }, 3000);
// })

// const myPromise2 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve(2)
//     }, 1000);
// })


// const myPromise3 = new Promise((resolve, reject) => {
//     if(false){

//         setTimeout(() => {
//             resolve(3)
//         }, 4000);
//     }else{
//         reject('error')
//     }
// })


// async function main(){
//     // const res1 = await new Promise(res => setTimeout(() => res(1), 3000))
//     // const res2 = await new Promise(res => setTimeout(() => res(1), 1000))
//     // const res3 = await new Promise(res => setTimeout(() => res(1), 4000))

//     const res = await Promise.any([myPromise1, myPromise2, myPromise3])
    
    
//     console.log(res, "res1")
// }

// main()

// const sleep = (ms) => {
//     return new Promise((res) =>{
//         setTimeout(() => {
//             res()
//         }, ms);
//     })
// }


// async function main(){
//     for(let i =0; i < 10; i++){
//         console.log(i)
//         await sleep(2000)
//     }
// }

// main()


// const button = document.querySelector('button')
// const h1 = document.querySelector('h1')

// button.addEventListener('click', async () => {
//     const resp = await fetch('https://catfact.ninja/fact')
//     const data = await resp.json()

//     h1.textContent = data.fact
// })


// const button = document.querySelector('button')
// const input = document.querySelector('input')
// const div = document.querySelector('div')

// button.addEventListener('click', async () => {
//     const resp = await fetch(`https://myfakeapi.com/api/cars/${input.value}`)
//     const data = await resp.json()

//     div.innerHTML = `
//         <h1>${data.Car.car}</h1>
//         <h1>${data.Car.price}</h1>
//     `
// })

// function debaucer(cb, ms){
//     let interval
//     return (...args) =>{
//         clearInterval(interval)
//         interval = setTimeout(() => {
//             cb(...args)
//         }, ms)
//     }
// }


// const input = document.querySelector('input')
// const div = document.querySelector('div')

// input.addEventListener('input', debaucer(async (e) => {
//     div.innerHTML = 'Loading...'
//     const resp = await fetch(`https://api.escuelajs.co/api/v1/products?title=${e.target.value}`)
//     const data = await resp.json()

//     console.log(data, "data")
//     div.innerHTML = data.map(el => (
//         `
//             <h1>${el.title}</h1>
//             <h1>${el.id}</h1>
//         `
//     )).join('')

// }, 300))

const MAXTRYCOUNT = 5
let tryCount = 0

async function main(){
    try{
        const resp = await fetch('https://rame123123.com')
        const data = await resp.json()

        console.log(data, "data")
    }catch(e){
        while(tryCount < MAXTRYCOUNT){
            tryCount++
            main()
        }
        console.log(e)
    }
}

main()

