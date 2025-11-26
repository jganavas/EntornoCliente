//Constantes para DOM
const botonEnviar = document.getElementById("botonzuelo");
const formulario = document.getElementById("formulario");
var tablero = document.getElementById("tablero");
var tableroLogico;
var tamano;

//Seteo tamaño de tablero a través del input del formulario
setTamanoTablero = function() {
    tamano = document.getElementById("inputDeUsuario").value;
    formulario.remove();
    
    //Tablero lógico
    tableroLogico = generarTableroLogico();

    jugar();
};

jugar = function() {
    generarHTML();
}

//Evento para controlar a qué fila y columna ha clickado el usuario
tablero.addEventListener("click", (e) => {
    let fila = 0;
    let columna = 0;
    if(e.target.classList.contains("celda")){
        fila = e.target.getAttribute("data-fila");
        columna = e.target.getAttribute("data-columna");
        //console.log(fila, columna);
    }
    if(e.target.innerText === "*"){
        tablero.remove();
    }
    mostrarCasillasAdyacentes(tableroLogico, fila, columna);
});

function generarHTML(){
    
    //Estilo para que el grid coloque las celdas automáticamente en función del tamaño introducido por el usuario
    tablero.style.gridTemplateColumns = `repeat(${tamano}, 1fr)`;

    //Creo celdas y posiciono su valor
    for(let i = 0; i < tamano; i++){   
        for(let j = 0; j < tamano; j++){  
            
            let celda = document.createElement("div");

            //Atributo de tipo data para guardar el valor con el que comparar con el tablero lógico
            celda.dataset.fila = i;
            celda.dataset.columna = j;
            
            //Añado estilos y celdas al tablero
            celda.classList.add("celda");
            celda.classList.add("oculta");
            tablero.classList.add("estilo-tablero");

            tablero.appendChild(celda);
        }    
    }

    let tamanoTotal = tamano*tamano;
    let celdas = document.getElementsByClassName("celda"); 

    for (let i = 0; i < tamanoTotal; i++) {
        
        let x = celdas[i].getAttribute("data-fila");
        let y = celdas[i].getAttribute("data-columna");
        
        celdas[i].innerText = tableroLogico[x][y];
    }
}

/* let celda = document.querySelector(`div[data-fila='${fila}'][data-columna='${columna}']`);

En estos métodos de revelarCelda y mostrarCasillasAdyacentes he usado un querySelector para acceder a la celda a través de los atributos que guardan su posición y la cual será sobre la que se va a accionar la función. He perdido casi 3 horas de mi vida porque no importaba lo que cambiase e intentase, siempre se accionaba una celda en la primera fila o en la primera columna. Resulta que usaba una coma entre cada corchete y eso funciona como un OR :_)

Estaba escrita asi:

querySelector(`div[data-fila='${fila}'], div[data-columna='${columna}']`);

*/

function revelarCelda(fila, columna){
    let celda = document.querySelector(`div[data-fila='${fila}'][data-columna='${columna}']`);
    
    celda.classList.remove("oculta");
    celda.classList.add("revelada");
    //console.log(`Fila: ${fila}, Columna: ${columna}`);
}

function mostrarCasillasAdyacentes(tablero, fila, columna){

    let tamanoTotal = tamano*tamano;

    let filaCorrecta = fila >= 0 && fila < tamano;
    let columnaCorrecta = columna >= 0 && columna < tamano;

    let celdita = document.querySelector(`div[data-fila='${fila}'][data-columna='${columna}']`);

    //CONDICION DE SALIDA RECURSIVDAD
    if(!filaCorrecta || !columnaCorrecta){
        return;
    }

    //CONDICION DE SALIDA RECURSIVIDAD
    if(celdita.classList.contains("revelada")){
        return;
    }
    
    revelarCelda(fila, columna);
    //console.log(`Log 1: Fila: ${fila}, Columna: ${columna}`);

    //Si tiene minas alrededor revelo el número de minas adyacentes sin mostrar su alrededor
    if(celdita.innerText != "0"){
        revelarCelda(fila, columna);
        //console.log(`Log 2: Fila: ${fila}, Columna: ${columna}`);
    //Si es una celda solitaria, revelo su alreddor
    }else if(celdita.innerText == "0"){

        for (let i = fila-1; i <= fila+1; i++) {
            //Mantengo fila en los límites
            if(i < 0 || i >= tamano){
                continue;
            } 
            for (let j = columna-1; j <= columna+1; j++) {
                //Mantengo columna en los límites
                if(j < 0 || j >= tamano){
                    continue;
                }
                //Ignoro la celda en la que se acciona el bucle
                if(i == fila && j == columna){
                    continue;
                }
                //console.log(`Log 3: Fila: ${fila}, Columna: ${columna}`);
                //console.log(`Log 3.2: Fila: ${i}, Columna: ${j}`);
                mostrarCasillasAdyacentes(tablero, i, j);
            }
        }
    }
}

function generarTableroLogico(){

    /* CREACION TABLERO */

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

    /* ASIGNACION BOMBAS */

    let count = 0;

    while(count < 8){
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

    /* ASIGNACIÓN VALORES DE CELDA */

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
    tablero = generarTableroLogico(tablero);
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


