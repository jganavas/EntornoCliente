let contenedor = document.getElementById("contenedor");
let num = 0;

document.addEventListener("keydown", (e) => {
    let caja = "";
    if(e.key.toLowerCase() === "c"){
        ++num;

        if(num === 11){
            alert("No se pueden mas cajas monstro");
            return;
        }

        caja = generarCaja();
        caja.addEventListener("mouseenter", (e) => {
        e.target.style.backgroundColor = "green";
        });
        caja.addEventListener("mouseleave", (e) => {
            e.target.style.backgroundColor = "white";
        });
        caja.addEventListener("click", (e) => {
            e.target.remove();
            num--;
        });

        contenedor.appendChild(caja);
    }
});

const generarCaja = () => {
    let caja = document.createElement("div");
    caja.setAttribute("id", num);
    caja.classList.add("caja");
    caja.innerText = num;

    return caja;
};
