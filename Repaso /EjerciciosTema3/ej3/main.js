const contenedor = document.getElementById("miniaturas");
const imagenPrincipal = document.getElementById("imagen");

contenedor.addEventListener("click", (e) => {
    if(e.target.tagName === "IMG"){
        let source = e.target.getAttribute("src");
        imagenPrincipal.setAttribute("src", source);
        e.target.classList.toggle("activa");
    }
});