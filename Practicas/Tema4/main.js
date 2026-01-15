let submit = document.getElementById("submit");
let selectInput = document.getElementById("select");
let label = document.getElementById("label");
let formulario = document.getElementById("formulario");
let estado = "creacion";
let num = 1;
let data_id = 1;

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    
    let numColumnas = parseInt(selectInput.value);

    if(!numColumnas){
        alert("Selecciona una cantidad de columnas");
        return;
    }

    if(estado === "creacion"){
        selectInput.remove();
        label.innerText = "Configura las columnas";

        for (let i = 0; i < numColumnas; i++) {
            let div = generarDiv();
            submit.insertAdjacentElement("beforebegin", div);
        }

        estado = "configuracion";
        return;
    }
    if(estado === "configuracion"){
        validarInputs();

        
    }

});

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
    inputCantidadTareas.setAttribute("placeholder", `Cantidad de tareas`);

    div.appendChild(inputNombre);
    div.appendChild(inputCantidadTareas);

    return div;
};

const generarInput = () => {

    let input = document.createElement("input");
    input.setAttribute("type", "text");

    return input;
};

const validarInputs = () => {
    
    const regex = /^([1-9]|1[0-9]|20)$/;

    formulario.addEventListener("change", (e) => {
        
        if(e.target.classList.contains("input-cantidad-tareas")){
            if(e.target.value.trim() === ""){
                alert("No se permiten campos vacios");
                e.target.focus();
            }else if(!regex.test(e.target.value)){
                alert("El numero de tareas es incorrecto");
                e.target.focus();
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
    }

};