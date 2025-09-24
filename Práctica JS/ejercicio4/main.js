let colores = ["red", "yellow", "green", "white", "blue", "brown", "pink", "black"];

let franjas = prompt("¿Cuántas franjas tendrá la bandera?");
while(franjas < 0 && franjas > 5){
    alert("Introduce un número válido (1-5)");
    franjas = prompt("¿Cuántas franjas tendrá la bandera?")
}

let array = [];
for(let i = 0; i <= 5; i++){
    array[i] += colores[Math.floor(Math.random()*colores.length)];
}

for(let i = 0; i <= franjas; i++){
    document.writeln(<table>
        

    </table>);    
}


