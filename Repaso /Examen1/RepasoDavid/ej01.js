let alumnos = [
    {nombre: "Alice", nota: 5},
    {nombre: "Juan", nota: 6},
    {nombre: "Alberto", nota: 1},
    {nombre: "Monica", nota: 6},
    {nombre: "David", nota: 10},
]

const muestraArrayObjetos = (arrayObjetos) => {
    return arrayObjetos.forEach((objeto) => {
        console.log(objeto.nombre + " - " + objeto.nota);
    })
}

const calculaNotaMedia = (arrayObjetos) => {
    let res = 0;
    arrayObjetos.forEach((objeto) => {
        res += objeto.nota;
    })
    return res/arrayObjetos.length;
}

const filtraAlumnos = (source, busqueda, param) => {
    switch (param) {
        case "nombre":
            return source.filter((valor) => {
                return valor.nombre.toLowerCase().includes(busqueda.toLowerCase());
            })
            break;
        case "nota":
            return source.filter((valor) => {
                return valor.nota === busqueda;
            })
            break;
        default:
            break;
    }
}


const ej01 = () => {
    console.log("Muestra Alumnos:");
    muestraArrayObjetos(alumnos);
    console.log("-------------------------------");
    console.log("Nota Media: " + calculaNotaMedia(alumnos));
    console.log("-------------------------------");
    let buscaNombre= "al";
    console.log("Filtra Alumnos:");
    console.log("Por nombre: " + buscaNombre);
    muestraArrayObjetos(filtraAlumnos(alumnos,buscaNombre, "nombre"));

    let buscaNota= 6;
    console.log("Filtra Alumnos:");
    console.log("Por nota: " + buscaNota);
    muestraArrayObjetos(filtraAlumnos(alumnos,buscaNota, "nota"));




}