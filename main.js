//Dom elements
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboard = document.getElementById('clipboard');


const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

clipboard.addEventListener('click',()=> {
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;

    if(!password){
        return;
    }
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Password Copied!')
})

generateEl.addEventListener('click', () => {
    const length = +lengthEl.value;
	const hasLower = lowercaseEl.checked;
	const hasUpper = uppercaseEl.checked;
	const hasNumber = numbersEl.checked;
	const hasSymbol = symbolsEl.checked;
    
    resultEl.innerText = generatePassword(hasLower , hasUpper , hasSymbol , hasNumber , length);
});

function generatePassword(lower,upper,symbol,number,length) {
    let generatePassword = '';

    const typesCount = lower + upper + symbol + number;
     
    const typesArr = [{lower},{upper},{number},{symbol}].filter(item => Object.values(item)[0]);

    if(typesCount === 0){
        return '';
    }

    for(let i=0;i<length;i += typesCount){
        typesArr.forEach(type => {
           const funcname = Object.keys(type)[0];
           generatePassword += randomFunc[funcname]();
        });
    }

    const finalPassword = generatePassword.slice(0,length);
    return finalPassword;
}

//Generator functions

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97); 
}
function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65); 
}
function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48); 
}
function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.';
    return symbols[Math.floor(Math.random()*symbols.length)];
}