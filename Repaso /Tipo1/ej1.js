const estudiantes = [ 
    {nombre: "Ana", nota: 8}, 
    {nombre: "Luis", nota: 5}, 
    {nombre: "María", nota: 9}, 
    {nombre: "Antonio", nota: 4} 
];

const mostrarEstudiantes = (estudiantes) => {
    estudiantes.forEach((estudiante) => {
      let {nombre, nota} = estudiante;
      console.log(`${nombre} - ${nota}\n`);
    });
};


const calcularNotaMedia = (estudiantes) => {
    let suma = estudiantes.reduce((acumulador, estudiante) => (
        acumulador + estudiante.nota), 0);
    
    let media = suma / estudiantes.length;
    return media;
};
console.log(calcularNotaMedia(estudiantes))

const estudiantesAprobados = (estudiantes) => {
    let aprobados =  estudiantes.filter((estudiante) => estudiante.nota >= 5);
    return aprobados;
};

let nombreEstudiante = "";
let estudiante = "";


nombreEstudiante = prompt("¿A qué estudiante quieres acceder?");
estudiante = estudiantes.find((estudiante) => estudiante.nombre == nombreEstudiante);

if(!estudiante){
    alert("El alumno no existe");
}else{
    alert(`Su nota es de ${estudiante.nota}`);
}
