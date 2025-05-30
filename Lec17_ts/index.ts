
let userName = "giorgi"

let age: number = 20
let isSmoker: boolean = false


function sum(a: number, b: number, isAbs?: boolean): number {
    return isAbs ? Math.abs(a + b) : a + b
}

function sub({ num1, num2 }: { num1?: number, num2?: number }) {

}

sub({ num1: 10, num2: 20 })

const result = sum(20, 20)
console.log(result)

const res2 = sum(-20, -50, true)
console.log(res2)



const nums: (number | string)[] = [1, 2, 3, 'gela']


function log<T>(msg: T) {
    console.log(msg)
}

log<string>('gela')



interface IAddress {
    home: string
    work: string
}

interface IUser {
    name: string,
    age: number
    isSmoker: boolean
    address: IAddress
}

interface IStudent extends IUser {
    grade: number
}

type UsetType = {
    name: string,
    age: number
    isSmoker: boolean
}

function changeUserName(user: IStudent) {

}


type BtnVariantType = 'sm' | 'md' | 'lg'


function renderBtn(size: BtnVariantType) {
    if (size === 'sm') {

    }
}


class Student { 
    private name
    public age
    protected grade
    readonly fee = 200
    constructor(name: string, age: number, grade: number){
        this.name = name
        this.age = age
        this.grade = grade
    }



    sayHello(){
        console.log(`Hello ${this.name}`)
    }
}

class ChildStundt extends Student{
    constructor(name: string, age: number, grade: number){
        super(name, age, grade)
    }

    getGrade(){
        this.grade  =10
    }
}

const child1 = new ChildStundt('ra', 11, 12)

const student1 = new Student('giorgi', 22, 87)
student1.sayHello()

type UserType = {
    id: number;
    name: string;
}
const user = [
    {
        id: 1,
        name: "giorgi"
    }
]

function getUsers(): Promise<UserType[]>{
    return new Promise((res, rej) => {
        setTimeout(() => {
            res(user)
        }, 2000)
    })
}



function getFirstElement<T>(arr: T[]): T{
    return arr[0]
}

getFirstElement<string | number>(['a', 'b', 'c'])

interface Foo{
    name: string
    age: number
}

function getNames<T extends {name: string}>(arr: T[]){
    return arr.map(el => el.name)
}

getNames([{name: 'rame', age:1}])


function getProps<T, K extends keyof T>(arr: T[], key: K): T[K][] {
  return arr.map(el => el[key]);
}

getProps([{ name: 'rame', age: 1 }], 'name');
