let km = prompt("Introduce el número de kilómetros del corredor");

while(km <= 0 || isNaN(km)){
    alert("ERROR");
    km = prompt("Introduce un valor válido");
}

let kmTotal = km*7;

if(kmTotal <= 10){
    document.writeln("El corredor es novato");
}else if(kmTotal > 10 && kmTotal <= 30){
    document.writeln("El corredor es iniciado");
}else if(kmTotal > 30 && kmTotal <= 40){
    document.writeln("El corredor es experto");
}else if(kmTotal >= 40){
    document.writeln("Corredor nivel Élite");
}