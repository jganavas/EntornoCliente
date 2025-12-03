//Constantes para DOM
const botonEnviar = document.getElementById("botonzuelo");
const formulario = document.getElementById("formulario");
var tablero = document.getElementById("tablero");
var tableroLogico;
var tamano;
let contadorCeldas = 0;
let numeroBombas = 8;
let cantidadBanderas = numeroBombas;
let contenedorTemporizador = document.getElementById("temporizador");
let contenedorBanderas = document.getElementById("cantidadBanderas");

let derrota;
let victoria;

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
    setInterval(temporizador, 1000);
}

let contenedorFinDePartida = document.getElementById("finDePartida");
let img = document.createElement("img");

function logicaClick(celda, fila, columna){
    if(celda.innerText === "*"){
        derrota = true;
    }

    mostrarCasillasAdyacentes(tableroLogico, fila, columna);

    if(derrota){
        tablero.remove();
        contenedorTemporizador.remove();
        contenedorBanderas.remove();
        img.setAttribute("src", "./img/explosion.gif");

        contenedorFinDePartida.appendChild(img);
    }else if(victoria){
        tablero.remove();
        contenedorTemporizador.remove();
        contenedorBanderas.remove();
        img.setAttribute("src", "./img/victoria.gif");

        contenedorFinDePartida.appendChild(img);
    }
}

function contarBanderas(){
    let celdas = document.getElementsByClassName("celda"); 
    let contadorBanderas = 0;
    let tamanoTotal = tamano*tamano;

    for (let i = 0; i < tamanoTotal; i++) {
      if(celdas[i].classList.contains("bandera")){
        contadorBanderas++;
        contenedorBanderas.innerText = "Banderas restantes: " + (numeroBombas - contadorBanderas);
      }
    }
    return contadorBanderas;
}

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

        if(celdas[i].innerText === "*"){
            celdas[i].dataset.bomba = "Bomba";
        }
    }
}

/* let celda = document.querySelector(`div[data-fila='${fila}'][data-columna='${columna}']`);

En estos métodos de revelarCelda y mostrarCasillasAdyacentes he usado un querySelector para acceder a la celda a través de los atributos que guardan su posición y la cual será sobre la que se va a accionar la función. He perdido casi 3 horas de mi vida porque no importaba lo que cambiase e intentase, siempre se accionaba una celda en la primera fila o en la primera columna. Resulta que usaba una coma entre cada corchete y eso funciona como un OR :_)

Estaba escrita asi:

querySelector(`div[data-fila='${fila}'], div[data-columna='${columna}']`);

*/

function revelarCelda(fila, columna){
    let celda = document.querySelector(`div[data-fila='${fila}'][data-columna='${columna}']`);
    
    let tamanoTotal = tamano*tamano;

    celda.classList.remove("oculta");
    celda.classList.add("revelada");

    contadorCeldas++;

    if(contadorCeldas >= tamanoTotal - numeroBombas){
        victoria = true;
    }
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

    //CONDICION DE SALIDA RECURSIVIDAD
    if(celdita.hasAttribute("data-bomba")){
        return;
    }

    //CONDICION DE SALIDA RECURSIVIDAD
    if(celdita.classList.contains("bandera")){
        return;
    }
    
    revelarCelda(fila, columna);
    
    //Si es una celda solitaria, revelo su alreddor
    if(celdita.innerText == "0"){

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
                mostrarCasillasAdyacentes(tablero, i, j);
            }
        }
    }
}

let minutos = 4;
let segundos = 60;

function temporizador(){
    segundos--;
    if(segundos < 0){
        minutos--;
        segundos = 60;
    }

    if(minutos === 0 && segundos === 0){
        alert("Te has quedado sin tiempo. Espabila");
    }
    
    let tiempo = `${minutos}:${segundos}`;

    contenedorTemporizador.textContent = tiempo;
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

    while(count < numeroBombas){
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

//Evento para controlar a qué fila y columna ha clickado el usuario
tablero.addEventListener("click", (e) => {
    let fila = 0;
    let columna = 0;
    if(e.target.classList.contains("celda")){
        fila = e.target.getAttribute("data-fila");
        columna = e.target.getAttribute("data-columna");
    }
    logicaClick(e.target, fila, columna);
});

//Evento para colocar banderas
tablero.addEventListener("contextmenu", (e) => {
    e.preventDefault();

    if(e.target.classList.contains("revelada")){
        e.stopPropagation();
    }
    else{
        let contadorBanderas = contarBanderas();
        if(contadorBanderas < numeroBombas){
            contadorBanderas--;
            e.target.classList.toggle("bandera");
            e.target.classList.toggle("oculta");
        }else{
            alert("No puedes usar más banderas");
        }
    }

});

tablero.addEventListener("dblclick", (e) => {
    if(e.target.classList.contains("bandera")){
        e.target.classList.remove("bandera");
        cantidadBanderas++;
    }
});

botonEnviar.addEventListener("click", setTamanoTablero);



