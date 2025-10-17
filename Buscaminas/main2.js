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
        //Genero aleatoriamente posiciones para colocar las minas
        let minaX = Math.floor(Math.random()*tablero.length);
        let minaY = Math.floor(Math.random()*tablero.length);
        
        //Me aseguro que no vuelvo a colocar una mina donde ya había una colocada
        if(tablero[minaX][minaY] == "*"){
            continue;
        }
        
        tablero[minaX][minaY] = "*";
        
        count++;
    }

    return tablero;
}

function generarTableroAdmin(tablero){

    //Recorro el tablero
    for (let i = 0; i < tablero.length; i++) {
        for (let j = 0; j < tablero.length; j++) {
            //Si la columna es una mina, continúo
            if(tablero[i][j] == "*"){
                continue;
            }
            let cont = 0;

            //Para cada columna, vuelvo a recorrer su alrededor
            for (let k = -1; k <= 1; k++) {
                for (let r = -1; r <= 1; r++) {
                    //Ignoro la celda en la que se acciona el bucle
                    if(k == 0 && r == 0){
                        continue;
                    }
                    //Se calcula la posición relativa en la que estaría la celda
                    let fila = i + k;
                    let columna = j + r;

                    if (fila >= 0 && fila < tablero.length && columna >= 0 && columna < tablero.length) {
                        if (tablero[fila][columna] === "*") {
                            cont++;
                        }
                    }
                }
            }
            tablero[i][j] = cont;
        }
    }

    return tablero;
}

function contarMinasAdyacentes(tablero, fila, columna){

    let cont = 0;
    for (let i = fila-1; i <= fila+1; i++) {
        //Mantengo fila en los límites
        if(i < 0 || i >= tablero.length){
            continue;
        } 
        for (let j = columna-1; j <= columna+1; j++) {
            //Mantengo columna en los límites
            if(j < 0 || j >= tablero.length){
                continue;
            } 
            if(tablero[i][j] == "*"){
                cont++;
            }
        }
    }

    return cont;
}

function generarTableroCopia(tamano){
    // Bucle para crear las filas
    let tableroCopia = [];
    for(let i = 0; i < tamano; i++){
        let fila = [];
        // Bucle para crear las columnas
        for(let j = 0; j < tamano; j++){
            let columna = "X";
            fila.push(columna);
        }
        tableroCopia.push(fila);
    }

    return tableroCopia;
}

function mostrarCasillasAdyacentes(tablero, tableroCopia, fila, columna){

    //Uso valor booleano para controlar el estado de la partida
    if(tablero[fila][columna] == "*"){
        return true;
    }
    //Si ya ha sido desvelada, paro
    if(tableroCopia[fila][columna] != "X"){
        return;
    }

    //Si tiene minas alrededor revelo el número de minas adyacentes
    if(tablero[fila][columna] != "0"){
        tableroCopia[fila][columna] = tablero[fila][columna];
    }else if(tablero[fila][columna] == "0"){

        for (let i = fila-1; i <= fila+1; i++) {
            //Mantengo fila en los límites
            if(i < 0 || i >= tablero.length){
                continue;
            } 
            for (let j = columna-1; j <= columna+1; j++) {
                //Mantengo columna en los límites
                if(j < 0 || j >= tablero.length){
                    continue;
                }
                //Ignoro la celda en la que se acciona el bucle
                if(i == fila && j == columna){
                    continue;
                }
                //Revelo posiciones mientras no sea una mina, de otra forma continúo  
                if(tablero[i][j] != "*"){
                    tableroCopia[i][j] = tablero[i][j];
                    mostrarCasillasAdyacentes(tablero, tableroCopia, i, j);
                }else{
                    continue;
                }               
            }
        }
    }
}

tablero = generarTablero(5);
tablero = colocarMinas(tablero, 4);
tablero = generarTableroAdmin(tablero);
console.table(tablero);
tableroJugador = generarTableroCopia(5);
mostrarCasillasAdyacentes(tablero, tableroJugador, 2, 2);
console.table(tableroJugador);
