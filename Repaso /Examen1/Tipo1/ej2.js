let palabras = ["programacion", "arquitectura", "medicina", "arboleda", "desarrollo", 
"navegador", "carpeta", "impresora"];

let palabra = palabras[Math.floor(Math.random()*palabras.length)];
let [...arrayPalabra] = palabra;

let palabraUsuario = arrayPalabra.map(() => "_");

let vidas = 6;
let letrasUsadas = [];
let letraIntroducida = "";

const actualizarProgreso = (arrayPalabra, letraIntroducida) => {
    arrayPalabra.forEach((letra, indice) => {
        if(letra === letraIntroducida){
            palabraUsuario[indice] = letra;
            for(letra in letrasUsadas){
                if(letrasUsadas.includes(letraIntroducida)){
                    break;
                }else{
                    letrasUsadas.push(letraIntroducida);
                }
            }
        }
    });
};

const mostrarEstado = (letrasUsadas, vidas, palabraUsuario) => {
    console.log(`${palabraUsuario}\n${letrasUsadas}\nVidas: ${vidas}`);
};

let partidaAcabada = false;
console.log("Bienvenido al juego del ahoracado");

while(!partidaAcabada){

    mostrarEstado(letrasUsadas, vidas, palabraUsuario);
    console.log(`Las letras que yas has usado son: ${letrasUsadas}`);
    console.log(`Vidas restantes: ${vidas}`);

    letraIntroducida = prompt("Introduce una letra");
    for(letra in letrasUsadas){
        if(letrasUsadas.includes(letraIntroducida)){
            alert("La letra ya ha sido usada");
            letraIntroducida = prompt("Introduce una letra");
        }
    }

    if(!arrayPalabra.includes(letraIntroducida)){
        vidas--;
        console.log("La palabra no incluye esa letra. Pierdes una vida");
    }else{
        actualizarProgreso(arrayPalabra, letraIntroducida);
    }

    if(vidas <= 0){
        console.log(`Has perdido! La palabra era: ${palabra}`)
        partidaAcabada = true;
    }
    if(!palabraUsuario.includes("_")){
        console.log(`Enhorabuena, has ganado! La palabra era: ${palabra}`)
        partidaAcabada = true;
    }
}