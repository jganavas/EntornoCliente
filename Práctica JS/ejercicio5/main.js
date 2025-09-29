let colores = ["red", "yellow", "green", "white", "blue", "brown", "pink", "black"];

//ARRAY DE EJEMPLO PARA PROBAR EL CÓDIGO
let palabras = ["hola", "yellow", "nose", "red", "lol", "bro", "pink", "jeee"];

/*
let palabras = [];
for (let i = 0; i < 8; i++) {
    
    palabras[i] = prompt(`Introduce la palabra ${i+1}: `);
    
}*/

for (let i = 0; i < 8; i++) {
    
    if(colores.includes(palabras[i])){
        let palabra = palabras.splice(i, 1)[0];
        palabras.splice(0, 0, palabra);
    }
 
}

//ANOTACIONES PERSONALES
/* EL MÉTODO .SPLICE FUNCIONA TANTO PARA ELIMINAR ELEMENTOS DE UN ARRAY COMO PARA MOVERLOS DE POSICIÓN
   (índice donde actua, número de valores a eliminar, valores con los que actúa)
   SI ACTUAMOS SOBRE EL PRIMER ÍNDICE Y NO ELIMINAMOS NINGÚN VALOR, LO AÑADE AL PRINCIPIO
   IMPORTANTE ANOTAR QUE ESTE MÉTODO DEVUELVE UN ARRAY Y SI QUEREMOS GUARDAR UN VALOR DE ÉL, DEBEMOS INDICAR EL ÍNDICE
   */

console.log(palabras);