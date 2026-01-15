let barraProgreso = document.getElementById("barra");
barraProgreso.style.backgroundColor = "red";

let intervalo = setInterval(actualizarProgreso, 1000);
let progreso = 0;

function actualizarProgreso(){
    progreso += 10;
    barraProgreso.style.width = progreso + "%";
    if(barraProgreso.style.width === "100%"){
        barraProgreso.style.backgroundColor = "green";
        clearInterval(intervalo);
    }
}

