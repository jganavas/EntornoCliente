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

function mostrarCasillasAdyacentes(tablero, fila, columna){

    let explosion = false;

    if(tablero[fila][columna] == "*"){
        explosion = true;
    }else{
        let count = 0;
        //BUCLE FILAS
        for (let i = fila-1; i <= fila+1; i++) {
            //MANTIENE ITERACIONES DENTRO DEL TABLERO
            if(i < 0 || i > tablero[i].length){
                i--;
                continue;
            } 
            //BUCLE COLUMNAS
            for (let j = columna-1; j <= columna+1; j++) {
                //MANTIENE ITERACIONES DENTRO DEL TABLERO
                if(j < 0 || j > tablero[i].length){
                    j--;
                    continue;
                }
                //LOGICA Y FUNCIONAMIENTO
                //Si la casilla no tiene bomba pero sí tiene una en su radio, se desvela sólo ella
                if(tablero[fila][columna] != "*" && contarMinasAdyacentes(tablero, fila, columna) != "0"){
                    tablero[fila][columna] = contarMinasAdyacentes(tablero, fila, columna);
                    break;
                //Si no contiene ninguna bomba en su radio, desvela el radio    
                }else if(contarMinasAdyacentes(tablero, fila, columna) == "0"){
                    tablero[i][j] = contarMinasAdyacentes(tablero, i, j);
                }else if(tablero[i][j] == "*"){
                    j--;
                    continue;
                //Si desvelando encuentra una casilla solitaria, vuelve a revelar su radio
                }else if(tablero[i][j] == "0"){
                    tablero = mostrarCasillasAdyacentes(tablero, i, j);
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
/*
let tablerov = generarTablero(5);
tablerov = colocarMinas(tablerov, 4);
console.log("TABLERO BASE: \n");
console.table(tablerov);
console.log("TABLERO ADMIN (jugando): \n");
console.table(mostrarCasillasAdyacentes(tablerov, 2, 2));
*/
function mostrarTablero(tablero, fila, columna){
    let copiaTablero = [...tablero];
    for (let i = 0; i < tablero.length; i++) {
      for (let j = 0; j <= tablero[i].length; j++) {
        if(tablero[i][j] == "*" || tablero[i][j] === "0"){
            copiaTablero[i][j] = "X";
        }
      }
    }
    return copiaTablero;
}
/*
console.log("TABLERO USUARIO: \n");
console.table(mostrarTablero(tablerov, 2, 2));
*/
function jugar(){

    let partidaAcabada = false;
    //JUEGO
    let tamanio = prompt("Introduce el tamaño del tablero");
    let tablero = generarTablero(tamanio);

    let cantidad = prompt("Introduce la cantidad de bombas con las que deseas jugar");
    tablero = colocarMinas(tablero, cantidad);
   
    let explosion = false;
    while(!explosion){
        let fila = prompt("Introduce posición X");
        let columna = prompt("Introduce posición Y");
        console.table(mostrarCasillasAdyacentes(tablero, fila, columna));
        console.table(mostrarTablero(tablero, fila, columna));
        if(tablero[fila][columna] == "*"){
            explosion = true;
        }
    }
    
}

jugar();


