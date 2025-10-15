function generarTablero(tamano){
    // Bucle para crear las filas
    let tablero = [];
    for(let i = 0; i < tamano; i++){
        let fila = [];
        // Bucle para crear las columnas
        for(let j = 0; j < tamano; j++){
            let columna = "0";
            fila.push(columna);
        }
        tablero.push(fila);
    }

    return tablero;
}

function colocarMinas(tablero, cantidad){
    

    let count = 0;

    while(count < cantidad){
        let minaX = Math.floor(Math.random()*tablero.length);
        let minaY = Math.floor(Math.random()*tablero.length);
        
        if(tablero[minaX][minaY] == "*"){
            continue;
        }
        
        tablero[minaX][minaY] = "*";
        
        count++;
    }

    return tablero;
}

function contarMinasAdyacentes(tablero, fila, columna){

    let count = 0;
    for (let i = fila-1; i <= fila+1; i++) {
      if(i < 0 || i > tablero[i].length){
        continue;
      } 
      for (let j = columna-1; j <= columna+1; j++) {
        if(j < 0 || j > tablero[i].length){
            continue;
        } 
        if(tablero[i][j] == "*"){
            count++;
        }
      }
    }
    return count;
}

//FUNCION mostrarCasillas (funcional) SIN RECURSIVIDAD
/*
function mostrarCasillasAdyacentes(tablero, fila, columna){

    let explosion = false;

    if(tablero[fila][columna] == "*"){
        explosion = true;
    }else{
        let count = 0;
        for (let i = fila-1; i <= fila+1; i++) {
            for (let j = columna-1; j <= columna+1; j++) {
                if(tablero[i][j] == contarMinasAdyacentes(tablero, fila, columna) == "0" || tablero[i][j] == contarMinasAdyacentes(tablero, fila, columna) == "*"){
                    tablero[i][j] = contarMinasAdyacentes(tablero, i, j);
                    tablero[fila][columna] = contarMinasAdyacentes(tablero, fila, columna);
                }else{
                    tablero[i][j] = contarMinasAdyacentes(tablero, i, j);
                }      
            }
        }
    }
    if(explosion){
        return "BOOM";
    }else{
        return tablero;
    }  
}
*/

function mostrarCasillasAdyacentes(tablero, fila, columna){

for (let i = fila-1; i <= fila+1; i++) {
    if(i < 0 || i > tablero[i].length){
        continue;
    } 
    for (let j = columna-1; j <= columna+1; j++) {
        if(j < 0 || j > tablero[i].length){
            continue;
        }else if(tablero[i][j] == contarMinasAdyacentes(tablero, fila, columna) == "0"){
            tablero = mostrarCasillasAdyacentes(tablero, i, j);
        }else{
            tablero[i][j] = contarMinasAdyacentes(tablero, i, j);
        }      
    }
}
return tablero; 
}

//PROBANDO RECURSIVIDAD
/*
function mostrarCasillasAdyacentes(tablero, fila, columna){

    let explosion = false;

    if(tablero[fila][columna] == "*"){
        explosion = true;
    }else{
        let count = 0;
        for (let i = fila-1; i <= fila+1; i++) {
            if(i < 0 || i > tablero[i].length) continue;

            for (let j = columna-1; j <= columna+1; j++) {
                if(j < 0 || j > tablero[i].length) continue;

                if(tablero[i][j] == contarMinasAdyacentes(tablero, fila, columna) == "*"){
                    tablero[fila][columna] = contarMinasAdyacentes(tablero, fila, columna);
                }else if(tablero[i][j] == contarMinasAdyacentes(tablero, fila, columna) == "0"){
                    tablero = mostrarCasillasAdyacentes(tablero, i, j);
                }else{
                    tablero[i][j] = contarMinasAdyacentes(tablero, i, j);
                }      
            }
        }
    }
    if(explosion){
        return "BOOM";
    }else{
        return tablero;
    }  
}
*/

let tablerov = generarTablero(5);
tablerov = colocarMinas(tablerov, 4);
console.log("TABLERO BASE: \n");
console.table(tablerov);
console.log("TABLERO ADMIN (jugando): \n");
console.table(mostrarCasillasAdyacentes(tablerov, 2, 2));

function mostrarTablero(tablero, fila, columna){
    let copiaTablero = [...tablero];
    for (let i = 0; i < tablero.length; i++) {
      for (let j = 0; j <= tablero[i].length; j++) {
        if(tablero[i][j] == "*" || tablero[i][j] === "0"){
            copiaTablero[i][j] = "#";
        }
      }
    }
    return copiaTablero;
}
console.log("TABLERO USUARIO: \n");
console.table(mostrarTablero(tablerov, 2, 2));

function jugar(tablero, fila, columna){
    if(tablero[fila][columna] == "*"){
        explosion = true;
    }else{
        console.table(mostrarTablero(tablero, fila, columna));
    }
    return explosion;
}

/*
//JUEGO
let tamanio = prompt("Introduce el tamaño del tablero");
let tablero = generarTablero(tamanio);

let cantidad = prompt("Introduce la cantidad de bombas con las que deseas jugar");
tablero = colocarMinas(tablero, cantidad);

let explosion = false;
while(!explosion){
    let fila = prompt("Introduce posición X");
    let columna = prompt("Introduce posición Y");
    jugar(tablero, fila, columna);
    if(jugar){
        explosion = true;
    }
}
*/