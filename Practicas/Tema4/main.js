let submit = document.getElementById("submit");
let selectInput = document.getElementById("select");
let label = document.getElementById("label");
let formulario = document.getElementById("formulario");
let estado = "creacion";
let num = 1;

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    
    let numColumnas = parseInt(selectInput.value);

    if(!numColumnas){
        alert("Selecciona una cantidad de columnas");
        return;
    }

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
        if (e.target.classList.contains("input-nombre") || 
            e.target.classList.contains("input-cantidad-tareas")) {
            guardarFormularioTemporal();
        }
    }
});

const guardarFormularioTemporal = () => {
    let formularioTemporal = JSON.parse(localStorage.getItem("formularioTemporal"));
    
    let inputsNombre = document.querySelectorAll(".input-nombre");
    let inputsCantidad = document.querySelectorAll(".input-cantidad-tareas");

    formularioTemporal["nombres"].forEach((input, indice) => {
        input["nombres"] = inputsNombre[indice].value;
    });

    formularioTemporal["numTareas"].forEach((input, indice) => {
        input["numTareas"] = inputsCantidad[indice].value;
    });
    
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
        numColumnas :`${numColumnas}`,
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

    estado = "configuracion";

    let configuracion = JSON.parse(localStorage.getItem("formularioTemporal"));
    crearFormulario(configuracion.numColumnas);

    let inputsNombre = document.querySelectorAll(".input-nombre");
    let numeroTareas = document.querySelectorAll(".input-cantidad-tareas");

    inputsNombre.forEach((input, indice) => {
        input.value = configuracion.nombres[indice];
    });

    numeroTareas.forEach((input, indice) => {
        input.value = configuracion.numTareas[indice];
    });

};

window.addEventListener("DOMContentLoaded", () => {
    cargarFormulario();
});
