let colores = ["red", "yellow", "green", "white", "blue", "brown", "pink", "black"];

let franjas = prompt("¿Cuántas franjas tendrá la bandera?");
while((franjas < 0 && franjas > 5) || isNaN(franjas)){
    alert("Introduce un número válido (1-5)");
    franjas = prompt("¿Cuántas franjas tendrá la bandera?")
}

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

for(let i = 0; i < franjas; i++){ 
    cadenaArray.unshift(franja);

    color += `tr:nth-child(${i+1}){background-color: ${array[Math.floor(Math.random()*array.length)]}\n }`;
      
}
estiloArray = ["<style>"];
estiloArray[1] = color;
estiloArray.push("</style>");


cadenaArray.unshift(tag);
cadenaArray.push(tagCierre);
cadena = cadenaArray.join("");
cadena += estiloArray.join("");

document.writeln(cadena);


for(let i = 0; i < franjas; i++){ 
    cadenaArray.unshift(franja);

    color += `tr:nth-child(${i+1}){background-color: ${array[Math.floor(Math.random()*array.length)]}\n }`;

    //PROBAR .INDEXOF
      
}