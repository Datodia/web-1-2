"use strict";
let userName = "giorgi";
let age = 20;
let isSmoker = false;
function sum(a, b, isAbs) {
    return isAbs ? Math.abs(a + b) : a + b;
}
function sub({ num1, num2 }) {
}
sub({ num1: 10, num2: 20 });
const result = sum(20, 20);
console.log(result);
const res2 = sum(-20, -50, true);
console.log(res2);
const nums = [1, 2, 3, 'gela'];
function log(msg) {
    console.log(msg);
}
log('gela');
function changeUserName(user) {
}
function renderBtn(size) {
    if (size === 'sm') {
    }
}
class Student {
    constructor(name, age, grade) {
        this.fee = 200;
        this.name = name;
        this.age = age;
        this.grade = grade;
    }
    sayHello() {
        console.log(`Hello ${this.name}`);
    }
}
class ChildStundt extends Student {
    constructor(name, age, grade) {
        super(name, age, grade);
    }
    getGrade() {
        this.grade = 10;
    }
}
const child1 = new ChildStundt('ra', 11, 12);
const student1 = new Student('giorgi', 22, 87);
student1.sayHello();
const user = [
    {
        id: 1,
        name: "giorgi"
    }
];
function getUsers() {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res(user);
        }, 2000);
    });
}
function getFirstElement(arr) {
    return arr[0];
}
getFirstElement(['a', 'b', 'c']);
function getNames(arr) {
    return arr.map(el => el.name);
}
getNames([{ name: 'rame', age: 1 }]);
