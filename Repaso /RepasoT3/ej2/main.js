const contenedorImagenes = document.getElementById("imagenes");
let imagenSeleccionada = "";

contenedorImagenes.addEventListener("dragstart", (e) => {
    if(e.target.tagName === "IMG"){
        imagenSeleccionada = e.target;
    }
});

contenedorImagenes.addEventListener("dragover", (e) => {
    e.preventDefault();
});

contenedorImagenes.addEventListener("drop", (e) => {
    let sourceImagenACambiar = imagenSeleccionada.getAttribute("src");
    let sourceDrag = e.target.getAttribute("src");

    e.target.setAttribute("src", sourceImagenACambiar);
    imagenSeleccionada.setAttribute("src", sourceDrag);
});
