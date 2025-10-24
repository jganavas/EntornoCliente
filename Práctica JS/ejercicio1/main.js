//EJERCICIO 1
/*
var num = prompt("Introduce un número");
while(num < 0 || isNaN(num)){
    num = prompt("Introduce un valor válido");
}

let divisores = "";
let sumaCuadrados = 0;

for(let i = 1; i < num; i++){
    if(num % i == 0){
        divisores += `${i}, `;
        sumaCuadrados += i*i;
    }
}

let esCuadrado = false;
let n = 0;

for(let j = 0; j < sumaCuadrados; j++){
    if(j*j == sumaCuadrados){
        esCuadrado = true;
        n = j;
    }
}

alert(`Los divisores son: ${divisores}`);
alert(`La suma de los cuadrados es ${sumaCuadrados}`);
if(esCuadrado){
    alert(`La suma es el cuadrado del número ${n}`);
}
*/

//VERSION ACTUALIZADA PARA TEMA 2
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Introduce numero 1", (num1) =>{
    let num1 = num1;
});


