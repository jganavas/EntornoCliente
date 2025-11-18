const boton = document.getElementById("botonzuelo");
let cont = 1;

boton.addEventListener("click", () => {
    let elementoLista = document.createElement("li");
    elementoLista.innerText = `Elemento ${cont++}`;

    let elementoListaPadre = document.getElementsByTagName("ol");

    elementoListaPadre[0].appendChild(elementoLista);
});


const lista = document.getElementsByTagName("ol");

lista[0].addEventListener("click", (e) => {
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("seleccionado");
    }
});

lista[0].addEventListener("dblclick", (e) => {
    if(e.target.tagName === "LI"){
        let elemento = e.target;
        elemento.remove();
    }
});