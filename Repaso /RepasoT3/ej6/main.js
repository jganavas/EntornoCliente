let contenedor = document.getElementById("contenedorCajas");
let num = 0;
let indice = 0;

document.addEventListener("keydown", (e) => {
    let input = document.getElementById("inputTexto");
    let texto = input.value;

    if(e.key === "Enter"){
        if(texto.trim() === ""){
            alert("No se permiten cajas vacías");
            return;
        }

        num++;

        if(num === 15){
            alert("No se pueden mas cajas monstro");
            return;
        }

        let caja = generarCaja();
        caja.innerText = `Etiqueta ${num} \nTexto: ${texto}`;
        caja.classList.add("caja");
        contenedor.appendChild(caja);
    }
});

document.addEventListener("keydown", (e) => {
    let cajas = document.querySelectorAll(".caja");
    if(e.key === "ArrowLeft"){
        if(indice > 0){
            let seleccionadas = document.querySelectorAll(".seleccionada");
            seleccionadas.forEach(caja => caja.classList.remove("seleccionada"));

            cajas[--indice].classList.add("seleccionada");
        }else if(indice === 0){
            indice = cajas.length;
        }
    }else if(e.key === "ArrowRight"){
        if(indice < cajas.length){
            let seleccionadas = document.querySelectorAll(".seleccionada");
            seleccionadas.forEach(caja => caja.classList.remove("seleccionada"));

            cajas[indice++].classList.add("seleccionada");
        }else if(indice === cajas.length){
            indice = 0;
        }
    }else if(e.key === "Backspace"){
        let cajaSeleccionada = document.querySelector(".seleccionada");
        cajaSeleccionada.remove();
    }
});

const generarCaja = () => {
    let caja = document.createElement("div");

    return caja;
};