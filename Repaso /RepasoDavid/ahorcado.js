
const validaInput = (input) => {
    input = input.toLowerCase();
    return input.length === 1 && (input[0] >= 'a' && input[0] <= 'z');
}

const palabraMask = (palabra) =>{
    return new Array(palabra.length).fill("_")
}

const updateMask = (mask, palabra, indexAciertos) => {
    for(let index of indexAciertos){
        mask[index] = palabra[index];
    }
    return mask;
}

const intento = (palabra, letra) => {
    let indexAciertos = [];
    for(let l in palabra){
        if(palabra[l] === letra) indexAciertos.push(l);
    }
    return indexAciertos;
}
const muestraVidas = (vidas) => {
    switch(vidas){
        case 6:
            return etapasAhorcado[0];
            break;
        case 5:
            return etapasAhorcado[1];
            break;
        case 4:
            return etapasAhorcado[2];
            break;
        case 3:
            return etapasAhorcado[3];
            break;
        case 2:
            return etapasAhorcado[4];
            break;
        case 1:
            return etapasAhorcado[5];
            break;
        case 0:
            return etapasAhorcado[6];
            break;
    }
}

const ahorcado = () => {
    let palabras = ["gato","perro","medico","analgesico","monitor"];
    let palabra = palabras.sort(()=> Math.random() - 0.5)[0].toLowerCase();
    let mask = palabraMask(palabra);
    let vidas = 6;
    let numLetras = palabra.length;
    let letrasUsadas = [];
    let letra = "";
    let indexAciertos = [];

    while(vidas > 0 && mask.join("") !== palabra){

        console.clear();

        console.log("--------------------------------------");
        console.log("-----------AHORCADO-------------------");
        console.log("--------------------------------------");

        console.log(muestraVidas(vidas));
        console.log("Vidas: "+vidas);
        console.log("La palabra tiene "+numLetras + " letras\n");
        console.log("Letras usadas: " + letrasUsadas.join(", "));

        console.log("La palabra:\n");
        console.log("\t" + updateMask(mask, palabra, indexAciertos).join(" "));

        //valida cosas
        while(true){
            letra = prompt("Tu letra:").toLowerCase();
            if(!validaInput(letra)) {
                alert("Input incorrecto!");
                continue;

            }
            if(letrasUsadas.includes(letra)){
                alert("Letra '" + letra + "' ya usada!");
                continue;
            }
            letrasUsadas.push(letra);
            break;
        }

        //lógica de la partida
        indexAciertos = intento(palabra, letra);

        if(indexAciertos.length === 0){
            alert("Incorrecto!");
            vidas --;
            continue;
        }
        else{
            updateMask(mask, palabra, indexAciertos);
            alert("Acierto!");
        }
    }

    //lógica de fin de juego
    console.log("--------------------------------------");

    if(vidas > 0){
        console.log("-----------------VICTORIA-------------");
        console.log("\t" + updateMask(mask, palabra, indexAciertos).join(" "));
    }
    else{
        console.log("-----------------CAGASTE-------------");
        console.log(muestraVidas(vidas));
        console.log("\t" + palabra.split("").join(" "));
    }

}

const etapasAhorcado = [
// Índice 0: 6 Vidas (Estado inicial)
    `
  +---+
  |   |
      |
      |
      |
      |
=========\
`,
//
// ---

// Índice 1: 5 Vidas (Cabeza)
    `
  +---+
  |   |
  O   |
      |
      |
      |
=========\
`,
//
// ---

// Índice 2: 4 Vidas (Cuerpo)
    `
  +---+
  |   |
  O   |
  |   |
      |
      |
=========\
`,
//
// ---

// Índice 3: 3 Vidas (Brazo Izquierdo)
    `
  +---+
  |   |
  O   |
 /|   |
      |
      |
=========\
`,
//
// ---

// Índice 4: 2 Vidas (Brazo Derecho)
    `
  +---+
  |   |
  O   |
 /|\\  |
      |
      |
=========\
`,
//
// ---

// Índice 5: 1 Vida (Pierna Izquierda)
    `
  +---+
  |   |
  O   |
 /|\\  |
 /    |
      |
=========\
`,
//
// ---

// Índice 6: 0 Vidas (¡Fin del juego!)
    `
  +---+
  |   |
  O   |
 /|\\  |
 / \\  |
      |
=========\
`
];