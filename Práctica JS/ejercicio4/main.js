let colores = ["red", "yellow", "green", "white", "blue", "brown", "pink", "black"];
/*
let franjas = prompt("¿Cuántas franjas tendrá la bandera?");
while((franjas < 0 && franjas > 5) || isNaN(franjas)){
    alert("Introduce un número válido (1-5)");
    franjas = prompt("¿Cuántas franjas tendrá la bandera?")
}*/
/*
let array = [];
for(let i = 0; i <= 5; i++){
    array[i] = colores[Math.floor(Math.random()*colores.length)];
}

let cadena = "";
let tag = "<table>";
let tagCierre = "</table>";
let franja = "<tr><td>Franja</td></tr>";
let cadenaArray = [];
let estiloArray = [];
let color = "";
*/
/*
//OPCION A
for(let i = 0; i < franjas; i++){ 
    cadenaArray.unshift(franja);

    color += `tr:nth-child(${i+1}){background-color: ${array[Math.floor(Math.random()*array.length)]}\n }`;
      
}*/
/*
//OPCION B
let arrayNoRep = [];
let colorAleatorio = colores[Math.floor(Math.random()*colores.length)];

for (let i = 0; i < franjas; i++) {
    do{
        colorAleatorio = colores[Math.floor(Math.random()*colores.length)];
    }while(arrayNoRep.includes(colorAleatorio));

    arrayNoRep.push(colorAleatorio);
}

for(let i = 0; i < franjas; i++){ 
    cadenaArray.unshift(franja);

    color += `tr:nth-child(${i+1}){background-color: ${arrayNoRep[i]}\n }`;
      
}
*/
//OPCION C
let arrayC = [];
let colorAleatorio = colores[Math.floor(Math.random()*colores.length)];

for (let i = 0; i < 5; i++) {
    do{
        colorAleatorio = colores[Math.floor(Math.random()*colores.length)];
    }while();
    arrayC.push(colorAleatorio);
}

for (let index = 0; index < 5; index++) {
    console.log(arrayC);
}


/*
estiloArray = ["<style>"];
estiloArray[1] = color;
estiloArray.push("</style>");


cadenaArray.unshift(tag);
cadenaArray.push(tagCierre);
cadena = cadenaArray.join("");
cadena += estiloArray.join("");

document.writeln(cadena);
*/
