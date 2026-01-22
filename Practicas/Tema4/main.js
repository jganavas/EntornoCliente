let submit = document.getElementById("submit");
let selectInput = document.getElementById("select");
let label = document.getElementById("label");
let formulario = document.getElementById("formulario");
let estado = "creacion";
let num = 1;
//localStorage.clear();

const formularioTemporal = {
    nombres: {},
    numeroTareas: {}
};

formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    let numColumnas;
    
    let formularioTemporal = JSON.parse(localStorage.getItem("formularioTemporal"));
    if(!formularioTemporal){
        numColumnas = parseInt(selectInput.value);
    }else{
        numColumnas = formularioTemporal.numColumnas;
    }

    if(estado === "creacion"){       
        crearFormulario(numColumnas);
        estado = "configuracion";
        return;
    }

    if(estado === "configuracion" && inputsValidados()){
        localStorage.removeItem("formularioTemporal");
        guardarEnMemoria(numColumnas);
        let formulario = localStorage.getItem("formulario");
        generarKanban(numColumnas);
    }

});

formulario.addEventListener("change", (e) => {
    if (estado === "configuracion") {
        guardarFormularioTemporal();      
    }
});

const guardarFormularioTemporal = () => {

    let inputsNombre = document.querySelectorAll(".input-nombre");
    let inputsCantidad = document.querySelectorAll(".input-cantidad-tareas");

    formularioTemporal.numColumnas = inputsNombre.length;

    for (let i = 0; i < inputsNombre.length; i++) {
        formularioTemporal.nombres[`nombreCol ${i+1}`] = inputsNombre[i].value;
    }

    for (let i = 0; i < inputsNombre.length; i++) {
        formularioTemporal.numeroTareas[`tareasCol ${i+1}`] = inputsCantidad[i].value;
    }
    
    localStorage.setItem("formularioTemporal", JSON.stringify(formularioTemporal));
};

let cantidadNombres = 1;
let numeroTarea = 1;

const generarDiv = () => {

    let div = document.createElement("div");
    div.style.marginBottom = "7%";

    let inputNombre = generarInput();
    let inputCantidadTareas = generarInput();

    inputNombre.style.marginBottom = "2%";
    inputNombre.classList.add("input-nombre");
    inputCantidadTareas.classList.add("input-cantidad-tareas");

    inputNombre.setAttribute("placeholder", `Nombre de columna ${cantidadNombres++}`);
    inputCantidadTareas.setAttribute("placeholder", "Cantidad de tareas");

    div.appendChild(inputNombre);
    div.appendChild(inputCantidadTareas);

    return div;
};

const generarInput = () => {

    let input = document.createElement("input");
    input.setAttribute("type", "text");

    return input;
};

const crearFormulario = (numColumnas) => {

    selectInput.remove();
    label.innerText = "Configura las columnas";

    for (let i = 0; i < numColumnas; i++) {
        let div = generarDiv();
        submit.insertAdjacentElement("beforebegin", div);
    }

};

const inputsValidados = () => {
    
    const regex = /^([1-9]|1[0-9]|20)$/;

    formulario.addEventListener("change", (e) => {
        
        if(e.target.classList.contains("input-cantidad-tareas")){
            if(e.target.value.trim() === ""){
                alert("No se permiten campos vacios");
                e.target.focus();
                return false;
            }else if(!regex.test(e.target.value)){
                alert("El numero de tareas es incorrecto");
                e.target.focus();
                return false;
            }
        }
        
    });

    let inputsNombre = document.querySelectorAll(".input-nombre");
    let camposVacios = false;

    inputsNombre.forEach((input) => {
        if(input.value.trim() === ""){
            camposVacios = true;
        }
    });

    if(camposVacios){
        alert("No se permiten campos vacíos en los nombres");
        return false;
    }

    return true;

};

const guardarEnMemoria = (numColumnas) => {

    const formulario = {
        numColumnas: numColumnas,
        nombres: {},
        numeroTareas: {}
    };

    let inputsNombre = document.querySelectorAll(".input-nombre");
    let numeroTareas = document.querySelectorAll(".input-cantidad-tareas");

    for (let i = 0; i < inputsNombre.length; i++) {
        formulario.nombres[`nombreCol ${i+1}`] = inputsNombre[i].value;
    }

    for (let i = 0; i < numeroTareas.length; i++) {
        formulario.numeroTareas[`tareasCol ${i+1}`] = numeroTareas[i].value;
    }

    localStorage.setItem("formulario", JSON.stringify(formulario));
};

const cargarFormulario = () => {

    if(localStorage.length === 0){
        return;
    }

    estado = "configuracion";

    let configuracion = JSON.parse(localStorage.getItem("formularioTemporal"));
    crearFormulario(configuracion.numColumnas);

    let inputsNombre = document.querySelectorAll(".input-nombre");
    let numeroTareas = document.querySelectorAll(".input-cantidad-tareas");

    Object.values(configuracion.nombres).forEach((nombre, indice) => {
        inputsNombre[indice].value = nombre;
    });

    Object.values(configuracion.numeroTareas).forEach((numero, indice) => {
        numeroTareas[indice].value = numero;
    });

};

window.addEventListener("DOMContentLoaded", () => {
    if(!localStorage.getItem("formulario")){
        cargarFormulario();
    }else{
        estado = "tablero";
    }
});

const guardarTarea = (tarea, columna) => {

    let tareasCol = Object.keys(tareas[columna+1]).length;

    tareas[columna+1][`tarea ${++tareasCol}`] = tarea.innerText;

    localStorage.setItem("tareas", JSON.stringify(tareas));

};

let tareas = {};

const cargarTareas = (numColumnas) => {
    let tareillas = JSON.parse(localStorage.getItem("tareas"));
    
    if (!tareillas) {
        for (let i = 0; i < numColumnas; i++) {
            tareas[i+1] = {};
        }
        localStorage.setItem("tareas", JSON.stringify(tareas));
        return; 
    }

    
    tareas = tareillas;

    let contenedoresTareas = document.querySelectorAll(".celda-tareas");

    Object.keys(tareas).forEach((columna, indice) => {
        let tareasColumn = tareas[columna];
        let itTareas = 1;
        Object.values(tareasColumn).forEach(tarea => {
            let p = document.createElement("p");
            p.classList.add("tarea");
            p.setAttribute("data-columna", indice+1);
            p.setAttribute("data-tarea-numero", itTareas++);
            p.innerText = tarea;
            p.setAttribute("draggable", "true");

            contenedoresTareas[indice].setAttribute("data-columna", indice+1);
            contenedoresTareas[indice].appendChild(p);
        });
    });

};

const dragndrop = () => {

    let tarea = "";
    let columna = 0;

    let contenedorcillos = document.querySelectorAll(".celda-tareas");

    contenedorcillos.forEach(contenedor => {

        contenedor.addEventListener("dragstart", (e) => {
            if(e.target.tagName === "P"){
                tarea = e.target;
                columna = e.target.getAttribute("data-columna");
            }
        });

        contenedor.addEventListener("dragover", (e) => {
            e.preventDefault();
        });

        contenedor.addEventListener("drop", (e) => {

            let tareasMemoria = JSON.parse(localStorage.getItem("tareas"));

            let numTarea = tarea.getAttribute("data-tarea-numero");
            let tareaAMover = tareasMemoria[columna][`tarea ${numTarea}`];

            let contenedorAMover = e.target.closest(".celda-tareas").getAttribute("data-columna");

            let cantTareasColumna = Object.keys(tareasMemoria[contenedorAMover]).length;
            
            tarea.setAttribute("data-tarea-numero", cantTareasColumna++);

            contenedorcillos[contenedorAMover-1].appendChild(tarea);

            tareasMemoria[contenedorAMover][`tarea ${cantTareasColumna}`] = tareasMemoria[columna][`tarea ${numTarea}`];
            delete tareasMemoria[columna][`tarea ${numTarea}`];

            localStorage.setItem("tareas", JSON.stringify(tareasMemoria));

        });

    });

};

const generarKanban = (numColumnas) => {
    let datosFormulario = JSON.parse(localStorage.getItem("formulario"));

    formulario.remove();
    let tablero = document.getElementById("tablero");

    tablero.style.gridTemplateColumns = `repeat(${numColumnas}, 1fr)`;

    Object.values(datosFormulario.nombres).forEach((nombre) => {
        let div = document.createElement("div");
        div.classList.add("celda-nombre");

        div.innerText = nombre;

        tablero.appendChild(div);
    });

    for (let i = 0; i < numColumnas; i++) {
        let div = document.createElement("div");
        div.classList.add("celda-tareas");
        div.setAttribute("data-columna", i+1);
        tablero.appendChild(div);
    }
    
    for (let i = 0; i < numColumnas; i++) {
        let div = document.createElement("div");
        div.classList.add("celda-botones");

        let inputTexto = generarInput();
        inputTexto.setAttribute("placeholder", "Describe la tarea");

        let boton = document.createElement("button");
        boton.innerText = "Añadir tarea";

        div.appendChild(inputTexto);
        div.appendChild(boton);
    
        let itTareas = 1;

        boton.addEventListener("click", () => {
            let textoTarea = inputTexto.value;
            if(textoTarea === ""){
                alert("No se permiten tareas vacias");
                return;
            }
            
            let tarea = document.createElement("p");
            tarea.classList.add("tarea");
            tarea.setAttribute("data-columna", i+1);
            tarea.setAttribute("data-tarea-numero", itTareas++);
            tarea.innerText = textoTarea;
            tarea.setAttribute("draggable", "true");

            let contenedorTareas = document.querySelectorAll(".celda-tareas")[i];
            contenedorTareas.appendChild(tarea);
            contenedorTareas.setAttribute("data-columna", i+1);

            guardarTarea(tarea, i);

            inputTexto.value = "";
            
        });
        
        tablero.appendChild(div);
    }

    cargarTareas(numColumnas);
    dragndrop();

};

if(localStorage.getItem("formulario")){
    let formulario = JSON.parse(localStorage.getItem("formulario"));
    let numColumnas = formulario.numColumnas;
    generarKanban(numColumnas);
}


