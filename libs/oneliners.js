//generate random string
const randomString = Math.random().toString(36).slice(2);

//extract email domain name
let email = 'random@email.com';
let domain = email.substring(email.indexOf('@') + 1);

//deter dark mode
const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').match;

//detect if an element is focused.
const element = document.querySelector('.text-input');
const isFocus = element == document.activeElement;

//check if an array is empty
let arr1 = [];
let arr2 = [2,4,6,8,10];

const arr1IsEmpty = !(Array.isArray(arr1) && arr1.length > 0);
const arr2IsEmpty = !(Array.isArray(arr2) && arr2.length > 0);

//redirect user
const redirect = url => location.href = url;

//check if a variable is a 
let fruit = 'apple';
let fruits = ['apple', 'banana', 'mango', 'orange', 'grapes'];

const isArray = (arr) => Array.isArray(arr);


