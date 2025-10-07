//let tamano = prompt("Introduce tamaño del tablero");

function generarTablero(tamano){
    // Bucle para crear las filas
    let tablero = [];
    for(let i = 0; i < tamano; i++){
        let fila = [];
        // Bucle para crear las columnas
        for(let j = 0; j < tamano; j++){
            let columna = 0;
            fila.push(columna);
        }
        tablero.push(fila);
    }

    return tablero;
}

//console.table(generarTablero(5));

function colocarMinas(tablero, cantidad){
    
    for (let i = 0; i < tablero.length; i++) {
        for (let j = 0; j < tablero[i].length; j++) {
            let count = 0;

            while(count < cantidad){
                let minaX = Math.floor(Math.random()*tablero.length);
                let minaY = Math.floor(Math.random()*tablero.length);
                
                tablero[minaX][minaY] = "*";
                /*if(tablero[minaX][minaY] == "*"){
                     continue;
                }*/
                count++;
            }
        }
    }
    return tablero;
}

let tablero = generarTablero(5);
tablero = colocarMinas(tablero, 4);
console.table(tablero);

/*function contarMinasAdyacentes(tablero, fila, columna){

    for (let i = fila; i < tablero.length; i++) {
        for (let j = columna; j < tablero[i].length; j++) {
            let count = 0;
            if(tablero[i-1][j-1] == "*" || tablero[i+1][j+1] == "*"){
                count++;
            }
        }
    }
    return count;
}

function mostrarCasillasAdyacentes(tablero, fila, columna){

    for (let i = fila; i < tablero.length; i++) {
        for (let j = columna; j < tablero[i].length; j++) {
            
        }
    }
    
}*/