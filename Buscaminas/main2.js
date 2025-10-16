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

function generarTableroAdmin(){

    for (let i = 0; i <= tablero.length; index++) {
        for (let index = 0; index < array.length; index++) {
            
        }
        
    }

}