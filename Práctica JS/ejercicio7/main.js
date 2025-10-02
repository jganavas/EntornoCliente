let nums = [];
let numeros = [20, 5, 7, 4, 32, 9, 2, 14, 11, 6];

/*for(let i = 0; i < 10; i++){
    nums[i] = prompt(`Introduce el número ${i+1}: `);
    if(isNaN(nums[i]) || nums[i] < 0){
        nums[i] = prompt("Introduce un valor válido");
    }
}*/

let valores = "";
for(let i = 0; i < 10; i++){
    valores += `Valor: ${numeros[i]}  (Índice ${i})\n`;
}

/*
let inicial = prompt("Introduce inicial");
let final = prompt("Introduce final");
let valido = inicial < final && inicial > 0 && final > 0 && inicial < 9 && final < 9; 

while(!valido){
    inicial = prompt("Introduce inicial");
    final = prompt("Introduce final");
} 
*/
let inicial = 3;
let final = 7;
let aux = 0;
aux = numeros[final];
numeros[final] = numeros[inicial];
console.log(valores);


/*for (let i = 0; i < 10; i++){
    numeros[final] = numeros[(final+1)%10];
    numeros[i] = numeros[i+1];
}*/



