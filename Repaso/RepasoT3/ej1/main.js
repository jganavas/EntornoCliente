let cajaBotones = document.getElementById("botonzuelos");
let parrafos = document.getElementById("parrafos");

let etiqueta = document.createElement("p");

cajaBotones.addEventListener("click", (e) => {
    let botonActivo = document.querySelector(".activo");
    if(botonActivo){
        botonActivo.classList.remove("activo");
    }

    if(e.target.tagName === "BUTTON"){
        e.target.classList.add("activo");
    }

    let target = e.target.getAttribute("data-target");
    let parrafo = document.getElementById(target);

    let parrafoVisible = document.querySelector("p:not(.invisible)");
    if(parrafoVisible){
        parrafoVisible.classList.add("invisible");
    }
    
    if(parrafo.classList.contains("invisible")){
        parrafo.classList.remove("invisible");
    }

});

