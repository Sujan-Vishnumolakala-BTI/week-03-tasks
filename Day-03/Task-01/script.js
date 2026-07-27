let num1 = 10;
let num2 = 12.57654678;

let str1 = "20"; 
let str2 = "45.7809876567";

let isTrue = true;

let boolValue = isTrue ? 1 : 0;

let sum = num1 + num2 + Number(str1) + Number(str2) + boolValue;

console.log("Sum = " , sum.toFixed(2));