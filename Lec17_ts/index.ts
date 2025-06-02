
// let userName = "giorgi"

// let age: number = 20
// let isSmoker: boolean = false


// function sum(a: number, b: number, isAbs?: boolean): number {
//     return isAbs ? Math.abs(a + b) : a + b
// }

// function sub({ num1, num2 }: { num1?: number, num2?: number }) {

// }

// sub({ num1: 10, num2: 20 })

// const result = sum(20, 20)
// console.log(result)

// const res2 = sum(-20, -50, true)
// console.log(res2)



// const nums: (number | string)[] = [1, 2, 3, 'gela']


// function log<T>(msg: T) {
//     console.log(msg)
// }

// log<string>('gela')



// interface IAddress {
//     home: string
//     work: string
// }

// interface IUser {
//     name: string,
//     age: number
//     isSmoker: boolean
//     address: IAddress
// }

// interface IStudent extends IUser {
//     grade: number
// }

// type UsetType = {
//     name: string,
//     age: number
//     isSmoker: boolean
// }

// function changeUserName(user: IStudent) {

// }


// type BtnVariantType = 'sm' | 'md' | 'lg'


// function renderBtn(size: BtnVariantType) {
//     if (size === 'sm') {

//     }
// }


// class Student { 
//     private name
//     public age
//     protected grade
//     readonly fee = 200
//     constructor(name: string, age: number, grade: number){
//         this.name = name
//         this.age = age
//         this.grade = grade
//     }



//     sayHello(){
//         console.log(`Hello ${this.name}`)
//     }
// }

// class ChildStundt extends Student{
//     constructor(name: string, age: number, grade: number){
//         super(name, age, grade)
//     }

//     getGrade(){
//         this.grade  =10
//     }
// }

// const child1 = new ChildStundt('ra', 11, 12)

// const student1 = new Student('giorgi', 22, 87)
// student1.sayHello()

// type UserType = {
//     id: number;
//     name: string;
// }
// const user = [
//     {
//         id: 1,
//         name: "giorgi"
//     }
// ]

// function getUsers(): Promise<UserType[]>{
//     return new Promise((res, rej) => {
//         setTimeout(() => {
//             res(user)
//         }, 2000)
//     })
// }



// function getFirstElement<T>(arr: T[]): T{
//     return arr[0]
// }

// getFirstElement<string | number>(['a', 'b', 'c'])

// interface Foo{
//     name: string
//     age: number
// }

// function getNames<T extends {name: string}>(arr: T[]){
//     return arr.map(el => el.name)
// }

// getNames([{name: 'rame', age:1}])


// function getProps<T, K extends keyof T>(arr: T[], key: K): T[K][] {
//   return arr.map(el => el[key]);
// }

// getProps([{ name: 'rame', age: 1 }], 'name');




type ArrTuple = [string, number]

const arr: ArrTuple = ['first', 2]


type UseStateTyple = [number, Function]

function useState(initValue: number): UseStateTyple {
    const value = initValue
    function setState() {

    }
    return [value, setState]
}

const [count, setCount] = useState(0)

const RoleObj = {
    USER: 'user',
    EDITOR: 'editor',
    ADMIN: 'admin'
}

enum Role {
    USER = 'user',
    EDITOR = 'editor',
    ADMIN = 'admin'
}

enum StatusCodes {
    NOTFOUND = 404,
    SUCCESS = 200,
    CREATED = 201
}


function getSomething(msg: string | number | string[]) {
    if (!msg) return
    if (typeof msg === 'string') {
        msg
    } else if (typeof msg === 'number') {
        msg
    } else if (msg && typeof msg === 'object' && msg.length > 0 && msg.every(el => typeof el === 'string')) {

    }
}

type Adress = {
    home: string,
    work: string
}

type User = {
    name?: string,
    age?: number,
    isSmoker: boolean,
    address: Adress,
    email: string,
    id: number
}

type Address1 = Partial<Adress>
type OptionalUser = Partial<User>

const onj: OptionalUser & Address1 = {
    isSmoker: false,
    name: "",
    address: {
        work: "",
        home: ''
    }
}

type BtnVariant = 'sm' | 'md' | 'lg'

const obj1: Record<BtnVariant, string> = {
    lg: 'asd',
    md: "asd",
    sm: 'asd'
}



type Student = Pick<User, 'name' | 'age' | 'email'> & {
    grades: number[]
}

type User2 = Omit<User, 'isSmoker' | 'address'> & {
    rameSxva: string
}




type Editor = {
    gender: 'F' | 'M'
}

type Admin = User & Editor & {
    permition: string
}


const err = {
    message:"wrong"
}


const getErrorMessage = (err: unknown) => {
    if(!err) return
    if(typeof err === 'string'){
        return err
    }else if(typeof err === 'object' && 'message' in err){
        return err.message
    }else if(typeof err === 'object' && Array.isArray(err)){
        return err.map(el => {
            if(el.message){
                return el.message
            }
        })
    }
}


type NeverType = string & number

type Role1 = 'admin' | 'user' | 'superAdmin'

function doSomething(role: Role1){
    switch(role){
        case 'admin':
            console.log('adniu')
            break
        case 'user':
            console.log('user')
            break
        default: 
            const unreachable: never = role
            console.log(unreachable)
    }
}

