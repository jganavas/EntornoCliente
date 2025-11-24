let botonEnviar = document.getElementById("botonzuelo");
var tamano;

setTamanoTablero = function() {
    tamano = document.getElementById("inputDeUsuario").value;
    jugar();
};

jugar = function() {
    
}

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
}

function generarTableroLogico(tablero){
    //Recorro el tablero
    for (let i = 0; i < tablero.length; i++) {
        for (let j = 0; j < tablero.length; j++) {
            //Si la columna es una mina, continúo
            if(tablero[i][j] == "*"){
                continue;
            }
            let cont = 0;

            //LOGICA PARA ASIGNAR A CADA CELDA SU NUMERO CORRESPONDIENTE
            for (let k = -1; k <= 1; k++) {
                for (let r = -1; r <= 1; r++) {
                    //Ignoro la celda en la que se acciona el bucle
                    if(k == 0 && r == 0){
                        continue;
                    }
                    //Se calcula la posición relativa en la que estaría la celda
                    let fila = i + k;
                    let columna = j + r;

                    if (fila >= 0 && fila < tablero.length && columna >= 0 && columna < tablero.length){
                        if(tablero[fila][columna] == "*"){
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

function generarHTML(){

    let tablero = [];
    for(let i = 0; i < tamano; i++){
        let fila = [];
        // Bucle para crear las columnas
        for(let j = 0; j < tamano; j++){
            let columna = "X";
            fila.push(columna);
        }
        tablero.push(fila);
    }

    //Creación etiquetas para el tablero
    let contenedorPadre = document.createElement("div");
    
    //Creo celdas
    for(let i = 0; i < tamano; i++){   
        for(let j = 0; j < tamano; j++){  
            let celda = document.createElement("div");
            let contenidoCelda = document.createElement("p");
            
            contenidoCelda.textContent = tablero[i][j];
            celda.innerHTML(contenidoCelda);
            contenedorPadre.appendChild(celda);
        }    
    }
    return contenedorPadre;
}

let tablero = generarHTML();
let main = document.getElementsByTagName("main");
tablero.classList.add("estilo-tablero");
main[0].appendChild(tablero);

/* CÓDIGO BUSCAMINAS DE CONSOLA */ 

/* 
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

            //LOGICA PARA ASIGNAR A CADA CELDA SU NUMERO CORRESPONDIENTE
            for (let k = -1; k <= 1; k++) {
                for (let r = -1; r <= 1; r++) {
                    //Ignoro la celda en la que se acciona el bucle
                    if(k == 0 && r == 0){
                        continue;
                    }
                    //Se calcula la posición relativa en la que estaría la celda
                    let fila = i + k;
                    let columna = j + r;

                    if (fila >= 0 && fila < tablero.length && columna >= 0 && columna < tablero.length){
                        if(tablero[fila][columna] == "*"){
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

    let filaCorrecta = fila >= 0 && fila < tablero.length && !isNaN(fila);
    let columnaCorrecta = columna >= 0 && columna < tablero.length && !isNaN(columna);

    //CONDICION DE SALIDA RECURSIVDAD
    if(!filaCorrecta || !columnaCorrecta){
        return;
    }

    //CONDICION DE SALIDA RECURSIVIDAD
    if(tableroCopia[fila][columna] != "X"){
        return;
    }
    
    tableroCopia[fila][columna] = tablero[fila][columna];

    //Si tiene minas alrededor revelo el número de minas adyacentes sin mostrar su alrededor
    if(tablero[fila][columna] != "0"){
        tableroCopia[fila][columna] = tablero[fila][columna];
    //Si es una celda solitaria, revelo su alreddor
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
                
                mostrarCasillasAdyacentes(tablero, tableroCopia, i, j);
            }
        }
    }
}

function mostrarTablero(tableroCopia){
    console.table(tableroCopia);
}

function esVictoria(tablero, tableroCopia){

    let esVictoria = true;

    for(let i = 0; i < tablero.length; i++){
        for(let j = 0; j < tablero.length; j++){
            if(tablero[i][j] != "*" && tableroCopia[i][j] == "X"){
                return false;
            }
        }
    }
    return esVictoria;
}

function jugar(){

    //Valores iniciales
    let tamano = parseInt(prompt("Introduce tamano del tablero"));
    let minas = parseInt(prompt("Introduce numero de minas"));

    //Variables de tablero
    let tablero = generarTablero(tamano);
    tablero = colocarMinas(tablero, minas);
    tablero = generarTableroAdmin(tablero);
    tableroCopia = generarTableroCopia(tamano);

    //Bucle de juego
    let explosion = false;
    while(!explosion){

        let fila = parseInt(prompt("Introduce fila"));
        let columna = parseInt(prompt("Introduce columna"));

        let filaCorrecta = fila >= 0 && fila < tamano && !isNaN(fila);
        let columnaCorrecta = columna >= 0 && columna < tamano && !isNaN(columna);

        if(!filaCorrecta || !columnaCorrecta){
            alert("Introduce valores válidos");
            continue;
        }

        if(tableroCopia[fila][columna] != "X"){
            alert("Este valor ya ha sido utilizado");
            continue;
        }

        if(tablero[fila][columna] == "*"){
            alert("BOOM");
            explosion = true;   
            mostrarTablero(tablero);
            console.log("Fueras estudiao");       
        }else{
            mostrarCasillasAdyacentes(tablero, tableroCopia, fila, columna);
            mostrarTablero(tableroCopia);

            if(esVictoria(tablero, tableroCopia)){
                alert("Has ganado :)");
                break;
            }
        }
    }
}
*/

botonEnviar.addEventListener("click", setTamanoTablero);

//alert(numeroDeMinas);


