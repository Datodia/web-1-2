

// class User {
//     constructor(name, age){
//         this.name = name
//         this.age = age
//     }
    

//     sayHello(){
//         console.log(`hello ${this.name}`)
//     }
// }


// const user1 = new User('giorgi', 21)
// console.log(user1.name)
// user1.sayHello()

// const user2 = new User('nika', 20)
// user2.sayHello()

// class Animal {
//     constructor(name){
//         this.name = name
//     }

//     alive(){
//         console.log('alive')
//     }

// }

// class Dog extends Animal {
//     constructor(name, breed){
//         this.breed = breed
//         super(name)
//     }

//     walk(){
//         console.log('Walking')
//     }
// }

// class Fish extends Animal {
//     constructor(name, age){
//         this.age = age
//         super(name)
//     }

//     swim(){
//         console.log('swimming')
//     }
// }

// const dog1 = new Dog('jeka', 'labradori')
// const fish1 = new Fish('nemo', 1)

// dog1.walk()
// fish1.swim()
// console.log(fish1.name)


// class Student {
//     #grade = 0

//     constructor(name){
//         this.name = name
//     }
    

//     exam1(num){
//         this.#grade += num
//     }

//     exam2(num){
//         this.#grade += num
//     }

//     getInfo(){
//         console.log(`${this.name} grade is ${this.#grade}`)
//     }
// }

// const student1 = new Student('nika')
// student1.exam1(30)
// student1.exam2(30)
// // student1.#grade = 100
// student1.getInfo()



// class Calculator {
//     #number = 0
//     constructor(num){
//         this.#number = num
//     }

//     add(num){
//         this.#number += num
//         return this
//     }

//     sub(num){
//         this.#number -= num
//         return this
//     }

//     mult(num){
//         this.#number *= num
//         return this
//     }

//     div(num){
//         this.#number /= num
//         return this
//     }

//     getValue(){
//         console.log(this.#number)
//         return this
//     }

//     get value(){
//         return this.#number
//     }
    
//     set value(num){
//         this.#number = num
//     }

// }


// const res = new Calculator(10)
// res.value = 10
// console.log(res.value)


// class Vehicle {

//     #startEngine(){
//         console.log('enging starting')
//     }

//     rotateKey(){
//         this.start()
//         console.log('rotating')
//     }


//     start(){
//         this.#startEngine()
//         console.log('starting')
//     }
// }

// class Car extends Vehicle{}


// const car1 = new Car
// // car1.start()


// class Shape {
    
//     getArea(radius){
//         return radius * radius * Math.PI
//     }

//     getName(){

//     }
// }

// class Circle extends Shape{}
// const circle1 = new Circle
// circle1.getArea(4)

// class Rectangle extends Shape {
//     getArea(width, height){
//         return width * height
//     }
// }

// const square = new Rectangle
// square.getArea()


//Create a BankAccount class with methods deposit(),
//  withDraw(), transferMony(), 
// transactionHistory(), getBalance()

class BankAccount{
    #balance = 0
    #history = []

    #addTransactionHistory(operation, amout, pId){
        const interData = {
            operation: operation,
            amout: amout,
            date: new Date().toISOString()
        }
        if(pId){
            interData.personId = pId
        }
        this.#history.push(interData)
    }

    deposit(amount){
        this.#balance += amount
        this.#addTransactionHistory('DEPOSIT', amount)
    }

    withDraw(amount){
        if(amount > this.#balance){
            return
        }
        this.#balance -= amount
        this.#addTransactionHistory('WITHDRAW', amount)
    }
    transferMony(pId, amount){
        if(amount > this.#balance){
            return
        }
        this.#balance -= amount
        this.#addTransactionHistory('TransferMoneyToSomeone', amount, pId)
    }

    transactionHistory(){
        console.log(this.#history)
    }

    getBalance(){
        console.log(this.#balance)
    }
}

const giorigsBank = new BankAccount
giorigsBank.deposit(2000)
giorigsBank.withDraw(700)
giorigsBank.transferMony('01002023', 500)
giorigsBank.getBalance()
giorigsBank.transactionHistory()

// [
//     {
//         operation: 'transger money',
//         amout: 100,
//         date: '2025-04-16T21:25:00.000Z'
//     }
// ]
