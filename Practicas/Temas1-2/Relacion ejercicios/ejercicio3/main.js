let presupuesto = prompt("¿Cuál va a ser el presupuesto de la obra?");

if(presupuesto < 0 || isNaN(presupuesto)){
    document.writeln("<h1>ERROR</h1>")
}else{
    let materiales = presupuesto * 0.50;
    let manoObra = presupuesto * 0.20;
    let licencias = presupuesto * 0.30;

    document.writeln(`El coste de los materiales será de ${materiales} euros`);
    document.writeln("<br></br>");

    document.writeln(`El coste de la mano de obra será de ${manoObra} euros`);
    document.writeln("<br></br>");

    document.writeln(`El coste de las licencias será de ${licencias} euros`);
}


