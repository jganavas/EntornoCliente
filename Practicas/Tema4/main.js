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
    
    let numColumnas = parseInt(selectInput.value);

    if(estado != "configuracion" && !numColumnas){
        alert("Selecciona una cantidad de columnas");
        return;
    }

    formularioTemporal.numColumnas = numColumnas;

    localStorage.setItem("formularioTemporal", JSON.stringify(formularioTemporal));

    if(estado === "creacion"){       
        crearFormulario(numColumnas);

        estado = "configuracion";
        return;
    }

    if(estado === "configuracion" && inputsValidados()){
        localStorage.removeItem("formularioTemporal");
        guardarEnMemoria(numColumnas);
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

const generarKanban = (numColumnas) => {
    formulario.remove();
    let tablero = document.getElementById("tablero");

    tablero.style.gridTemplateColumns = `repeat(${numColumnas}, 1fr)`;


};