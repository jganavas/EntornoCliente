let nums = [];

//ARRAY COMPROBACION CODIGO
let numeros = [20, 5, 7, 4, 32, 9, 2, 14, 11, 6];

/*for(let i = 0; i < 10; i++){
    nums[i] = prompt(`Introduce el número ${i+1}: `);
    if(nums[i] < 0){
        nums[i] = prompt("Introduce un valor válido");
    }
}*/

/*let valores = "";
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
*/

//VARIABLES COMPROBACION
let inicial = 3;
let final = 7;


let aux = numeros[9];
numeros.splice(final, 0, inicial+1);
numeros.splice(inicial, 1);
numeros.unshift(aux);

//COMPROBACION CÓDIGO
let valores = "";
for(let i = 0; i < 10; i++){
    valores += `Valor: ${numeros[i]}  (Índice ${i})\n`;
}
console.log(valores);    


/*valores = "";
for(let i = 0; i < 10; i++){
    valores += `Valor: ${nums[i]}  (Índice ${i})\n`;
}
alert(`Resultado: ${valores}`);*/






