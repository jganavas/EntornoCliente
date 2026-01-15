let body = document.getElementById("cuerpaso");
let num = 0;
let texto = document.createElement("p");
texto.innerText = num;
body.appendChild(texto);

body.addEventListener("keydown", (e) => {
    if(e.key === "ArrowUp"){
        num++;
    }else if(e.key === "ArrowDown"){
        num--;
    }else if(e.key.toLowerCase() === "r"){
        num = 0;
    }
    texto.innerText = num;
});