let nums = [];

for(let i = 0; i < 10; i++){
    nums[i] = prompt(`Introduce el número ${i+1}: `);
    if(nums[i] < 0){
        nums[i] = prompt("Introduce un valor válido");
    }
}

let valores = "";
for(let i = 0; i < 10; i++){
    valores += `Valor: ${nums[i]}  (Índice ${i})\n`;
}
alert(`Números introducidos: ${valores}\n`);


let inicial = prompt("Introduce inicial");
let final = prompt("Introduce final");
let valido = inicial < final && inicial > 0 && final > 0 && inicial < 9 && final < 9; 

while(!valido){
    inicial = prompt("Introduce inicial");
    final = prompt("Introduce final");
} 

let aux = nums[9];
nums.splice(final, 0, nums[inicial]);
nums.splice(inicial, 1);
nums.unshift(aux);

valores = "";
for(let i = 0; i < 10; i++){
    valores += `Valor: ${nums[i]}  (Índice ${i})\n`;
}
alert(`Resultado: ${valores}`);

/*COMPROBACION CÓDIGO
let numeros = [20, 5, 7, 4, 32, 9, 2, 14, 11, 6];

let inicial = 3;
let final = 7;

let aux = numeros[9];
numeros.splice(final, 0, numeros[inicial]);
numeros.splice(inicial, 1);
numeros.unshift(aux);

let valores = "";
for(let i = 0; i < 10; i++){
    valores += `Valor: ${numeros[i]}  (Índice ${i})\n`;
}
console.log(valores);    
*/






