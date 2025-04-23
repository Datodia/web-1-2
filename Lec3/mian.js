
// console.log(1)
// console.log(2)
// Promise.resolve().then(() => {
//     for(let i = 0; i < 100_000_000_0; i++){}
//     console.log('blocker ended')
// })
// console.log(3)


// const myPromise = new Promise((resolve, reject) => {
//     const status = true
//     if(status){
//         resolve('success')
//     for(let i = 0; i < 100_000_000_0; i++){}
//     }else{
//         reject('error')
//     }
// })


// // myPromise
// //     .then(res => console.log(res))
// //     .catch(er => console.log(er))

// async function main() {
//     try{
//         const res = await myPromise
//         console.log(res)
//     }catch(e){
//         console.log(e)
//     }
// }

// main()



// function a(){
//     a()
// }

// function b(){
//     console.log(2)
//     c()
// }

// function c(){
//     console.log(3)
// }

// a()


// let firstName = 'nika'
// let firstName2 = firstName

// firstName2 = "giorgi"


// const user = {
//     name: "mamuka"
// }

// const user2 = user

// user2.name = "mari"

// console.log(firstName)
// console.log(user)


// function a(callBack){
//     setTimeout(() => {
//         console.log(1)
//         callBack()
//     }, 1000)
// }
// a(b)
// console.log(2)

// function b(){
//     console.log(3)
// }



// console.log(1)


function foo(sec){
    let interval = 0
    
    interval = setInterval(() => {
        const random = Math.floor(Math.random() * 10) + 1
        console.log(sec, random)

        if(sec === random){
            clearInterval(interval)
        }
        
    }, 1000);

}

foo(5)