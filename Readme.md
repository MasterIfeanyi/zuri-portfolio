# Getting started

## Description

Zuri portfolio website

## Technologies


![Tech](https://img.shields.io/badge/Nodejs-34562l?style=for-the-badge&logo=Node.js&logoColor=white)

## Resources

For more optimizing code I found a package **node-quick-cli**

its not support require() to support change file name .js to .mjs

```javascript
import readline from 'node-quick-cli';
var readlineq = new readline();
(async () => {
    console.log(await readlineq.question('Question 1 : '));
    console.log(await readlineq.question('question 3 : ',{color:"blue"}));
    console.log(await readlineq.question('Question 2 : ',{bgcolor:"bgBlue"}));
    readlineq.close();
})();
```

[answer](https://stackoverflow.com/a/71138158/17171424)


The **prompt-sync** package provides an easy-to-use alternative to this callback-based syntax.


```javascript

const prompt = require('prompt-sync')();

const name = prompt('What is your name?');
console.log(`Hey there ${name}`);

```

## Links
   
[answer](https://www.codecademy.com/article/getting-user-input-in-node-js)


[nodejs guessing game](https://gist.github.com/peterjacobson/305184d71fa347ea5b95)