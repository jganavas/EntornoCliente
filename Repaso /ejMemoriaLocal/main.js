const botonAniadir = document.getElementById("botonAniadir");
const botonLista = document.getElementById("botonLista");
const botonBorrar = document.getElementById("botonBorrar");
const texto = document.getElementById("textArea");
const lista = document.getElementById("lista");
let numItem = localStorage.length;

botonAniadir.addEventListener("click", () => {
    if(texto.value === ""){
        alert("No se permiten campos vacíos");
        return;
    }else{
        const elemento = texto.value;
        localStorage.setItem(`Item ${++numItem}`, elemento);
    }
});

botonLista.addEventListener("click", (e) => {
    e.preventDefault();
    let dataNum = 0;
    const ul = document.getElementById("lista");

    if(!ul.hasChildNodes()){
        Object.keys(localStorage).forEach(clave => {
            const li = document.createElement("li");
            li.innerText = localStorage.getItem(clave);
            li.dataset.clave = `Item ${++dataNum}`;
            lista.appendChild(li);
        });
    }
});

botonBorrar.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.clear();
    lista.remove();
    numItem = 0;
});

lista.addEventListener("dblclick", (e) => {
    e.target.remove();
    const data = e.target.getAttribute("data-clave");
    localStorage.removeItem(data);
});
