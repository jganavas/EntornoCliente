// 🎯 EJERCICIO COMPLETO: FUNCIONES FLECHA Y MÉTODOS DE ARRAYS
// Objetivo: Practicar .map(), .filter(), .find(), .some(), .every(), .sort(), .reduce() y desestructuración

/* 
📚 RECORDATORIO DE MÉTODOS:
- .map() → Transforma cada elemento (devuelve array mismo tamaño)
- .filter() → Filtra elementos que cumplen condición
- .reduce() → Reduce array a un solo valor (suma, producto, objeto, etc.)
- .find() → Encuentra el primer elemento que cumple condición
- .some() → ¿Algún elemento cumple la condición?
- .every() → ¿Todos los elementos cumplen la condición?
- .sort() → Ordena el array
- .forEach() → Ejecuta una función por cada elemento (no devuelve nada)

📚 DESESTRUCTURACIÓN:
- Extraer propiedades de objetos: const { nombre, edad } = persona;
- Extraer elementos de arrays: const [primero, segundo] = array;
- En parámetros de función: const saludar = ({ nombre, edad }) => { ... };
*/

// ==========================================
// 🔥 DESAFÍO 1: GESTIÓN DE ESTUDIANTES
// ==========================================

const estudiantes = [
    { nombre: "Ana", edad: 20, notas: [8, 9, 7, 10] },
    { nombre: "Luis", edad: 22, notas: [5, 6, 4, 7] },
    { nombre: "María", edad: 19, notas: [9, 10, 9, 10] },
    { nombre: "Carlos", edad: 21, notas: [6, 7, 8, 5] },
    { nombre: "Laura", edad: 20, notas: [10, 9, 10, 10] }
];

// TODO 1: Crea una función flecha que calcule el promedio de un array de notas
// Ejemplo: calcularPromedio([8, 9, 7, 10]) → 8.5
// Usa .reduce() para sumar: array.reduce((acumulador, elemento) => acumulador + elemento, 0)

const calcularPromedio = (notas) => {
    return notas.reduce((suma, nota) => suma + nota) / notas.length;
};


// TODO 2: Usa .map() para crear un array con el promedio de cada estudiante
// Formato: [{ nombre: "Ana", promedio: 8.5 }, ...]

estudiantes.forEach(estudiante => {
    let promedio = calcularPromedio(estudiante.notas);
    estudiante["media"] = promedio;
});

estudiantes.forEach(estudiante => {console.log(estudiante.nombre, estudiante.media)});


// TODO 3: Usa .filter() para obtener solo estudiantes con promedio >= 8

let sobresalientes = estudiantes.filter(estudiante => estudiante.media >= 8);
console.log(sobresalientes);

// TODO 4: Usa .find() para encontrar al estudiante con mejor promedio
// Pista: Primero calcula los promedios, luego usa Math.max()

let mejorEstudiante = estudiantes.find(estudiante => estudiante.media = Math.max(estudiante.media));
console.log(mejorEstudiante);

// TODO 5: Usa .some() para verificar si algún estudiante tiene promedio perfecto (10)

let estudiantePerfecto = estudiantes.some(estudiante => estudiante.media === 10);
console.log(estudiantePerfecto);

// TODO 6: Usa .every() para verificar si todos los estudiantes son mayores de edad (>=18)

let sonMayoresDeEdad = estudiantes.every(estudiante => estudiante.edad >= 18);
console.log(sonMayoresDeEdad);

// ==========================================
// 🔥 DESAFÍO 2: GESTIÓN DE PRODUCTOS
// ==========================================

const productos = [
    { id: 1, nombre: "Laptop", precio: 1200, categoria: "Electrónica", stock: 5 },
    { id: 2, nombre: "Mouse", precio: 25, categoria: "Electrónica", stock: 50 },
    { id: 3, nombre: "Teclado", precio: 45, categoria: "Electrónica", stock: 30 },
    { id: 4, nombre: "Monitor", precio: 300, categoria: "Electrónica", stock: 10 },
    { id: 5, nombre: "Webcam", precio: 80, categoria: "Electrónica", stock: 0 },
    { id: 6, nombre: "Auriculares", precio: 60, categoria: "Audio", stock: 20 }
];

// TODO 7: Filtra productos que tengan stock disponible (stock > 0)

let productos_filtrados = productos.filter(producto => producto.stock > 0);
console.log(productos_filtrados);

// TODO 8: Crea un array con los nombres de productos en mayúsculas usando .map()

let nombresCaps = productos.map(producto => 
    {
        producto.nombre = producto.nombre.toUpperCase;
    }
);
console.log(nombresCaps);

// TODO 9: Calcula el valor total del inventario (precio * stock de cada producto) usando .reduce()
// Pista: productos.reduce((total, producto) => total + (producto.precio * producto.stock), 0)
// Explicación reduce:
//   - Acumulador inicial: 0
//   - En cada iteración: suma (precio * stock) al acumulador
//   - Resultado final: suma total de todos los valores

const valorTotal = (objeto) => {
    return objeto.reduce((suma, objeto) => suma + (objeto.precio * objeto.stock), 0);
};
console.log(valorTotal(productos));

// TODO 10: Verifica si todos los productos cuestan más de 20€ usando .every()

const superior20Euros = (objeto) => {
    return objeto.every(producto => producto.precio > 20);
};

console.log(superior20Euros(productos));

// ==========================================
// 🔥 DESAFÍO 3: DESESTRUCTURACIÓN
// ==========================================

const personas = [
    { nombre: "Ana", apellido: "García", edad: 25, ciudad: "Madrid", profesion: "Desarrolladora" },
    { nombre: "Luis", apellido: "Martínez", edad: 30, ciudad: "Barcelona", profesion: "Diseñador" },
    { nombre: "María", apellido: "López", edad: 28, ciudad: "Valencia", profesion: "Ingeniera" }
];

// TODO 11: Usa desestructuración para extraer nombre y edad del primer objeto
//const { nombre, edad } = personas[0];
//console.log(nombre, edad); // "Ana" 25

const obtenerNombreEdad = (persona) => {
    let {nombre, edad} = persona;
    return {nombre, edad};
};
console.log(obtenerNombreEdad(personas[0]));


// TODO 12: Crea una función que use desestructuración en los parámetros
// const presentarse = ({ nombre, profesion }) => `Hola, soy ${nombre} y soy ${profesion}`;
// console.log(presentarse(personas[0])); // "Hola, soy Ana y soy Desarrolladora"


// TODO 13: Usa .map() con desestructuración para crear un array de presentaciones
// const presentaciones = personas.map(({ nombre, ciudad }) => `${nombre} vive en ${ciudad}`);
const presentaciones = personas.map(({ nombre, ciudad }) => `${nombre} vive en ${ciudad}`);
console.log(presentaciones);

// TODO 14: Desestructura un array de números
// const numeros = [10, 20, 30, 40, 50];
// const [primero, segundo, ...resto] = numeros;
// console.log(primero);  // 10
// console.log(segundo);  // 20
// console.log(resto);    // [30, 40, 50]


// ==========================================
// 🔥 DESAFÍO 4: MANIPULACIÓN DE STRINGS
// ==========================================

const frases = [
    "JavaScript es genial",
    "Aprender programación es divertido",
    "Las funciones flecha son poderosas",
    "Node.js es increíble"
];

// TODO 15: Usa .map() para convertir cada frase a un array de palabras
// Resultado: [["JavaScript", "es", "genial"], [...], ...]
// Pista: frase.split(" ")

const frasesArray = frases.map(frase => frase.split(" "));

function convertirString_Array(frases){
    let array = frases.map(frase => frase.split(" "));
    return array;
};
console.log(frasesArray);
console.log(convertirString_Array(frases));

// TODO 16: Encuentra la primera frase que contiene "flecha" usando .find()
// Pista: frase.includes("flecha")

const primeraFrase = (array, palabra) => {
    let frase = array.find(frase => {
        frase.includes(palabra);
    });
    return frase;
};

console.log(primeraFrase("flecha"));


// TODO 17: Filtra solo las frases que contengan la palabra "es"


// ==========================================
// 🔥 DESAFÍO 5: NÚMEROS Y ESTADÍSTICAS
// ==========================================

const numeros = [15, 8, 23, 42, 4, 16, 31, 9, 12, 27];

// TODO 18: Filtra números pares y multiplícalos por 2 (combina .filter() y .map())


// TODO 19: Ordena los números de mayor a menor usando .sort()
// Pista: .sort((a, b) => b - a)


// TODO 20: Verifica si algún número es mayor a 40 usando .some()


// ==========================================
// 🔥 DESAFÍO 6: FUNCIONES DE ORDEN SUPERIOR
// ==========================================

// TODO 21: Crea una función flecha que devuelva otra función flecha
// multiplicarPor(n) → devuelve función que multiplica por n
// Ejemplo: const duplicar = multiplicarPor(2); duplicar(5) → 10


// TODO 22: Crea una función que reciba un array y una función de transformación
// transformar(array, funcionTransformacion)
// Ejemplo: transformar([1,2,3], n => n * 2) → [2, 4, 6]


// ==========================================
// PRUEBAS (descomenta según vayas completando)
// ==========================================

/*
console.log("=== DESAFÍO 1: ESTUDIANTES ===");
console.log("Promedio de Ana:", calcularPromedio(estudiantes[0].notas));
console.log("Promedios:", promedios);
console.log("Aprobados (>=8):", aprobados);
console.log("Mejor estudiante:", mejorEstudiante);
console.log("¿Hay promedio perfecto?:", hayPerfecto);
console.log("¿Todos mayores de edad?:", todosMayores);

console.log("\n=== DESAFÍO 2: PRODUCTOS ===");
console.log("Productos disponibles:", productosDisponibles);
console.log("Nombres en mayúsculas:", nombresMayusculas);
console.log("Valor total inventario:", valorInventario);
console.log("¿Todos cuestan más de 20€?:", todosMasDe20);

console.log("\n=== DESAFÍO 3: DESESTRUCTURACIÓN ===");
const { nombre, edad } = personas[0];
console.log("Nombre y edad:", nombre, edad);
console.log("Presentación:", presentarse(personas[0]));
console.log("Presentaciones:", presentaciones);

console.log("\n=== DESAFÍO 4: STRINGS ===");
console.log("Frases divididas:", frasesDivididas);
console.log("Frase con 'flecha':", fraseConFlecha);
console.log("Frases con 'es':", frasesConEs);

console.log("\n=== DESAFÍO 5: NÚMEROS ===");
console.log("Pares duplicados:", paresDuplicados);
console.log("Ordenados desc:", numerosOrdenados);
console.log("¿Alguno > 40?:", algunoMayorA40);

console.log("\n=== DESAFÍO 6: ORDEN SUPERIOR ===");
const duplicar = multiplicarPor(2);
const triplicar = multiplicarPor(3);
console.log("duplicar(5):", duplicar(5));
console.log("triplicar(5):", triplicar(5));
console.log("transformar([1,2,3], n => n * 2):", transformar([1,2,3], n => n * 2));
*/

// ==========================================
// 🎯 BONUS: COMBINA TODO
// ==========================================

// TODO BONUS: Crea una función que reciba un array de números y devuelva:
// - Solo números impares (usa .filter())
// - Elevados al cuadrado (usa .map())
// - Ordenados de menor a mayor (usa .sort())
// - Todo en UNA SOLA CADENA: array.filter(...).map(...).sort(...)


// ==========================================
// 💡 CONSEJOS:
// ==========================================
/*
1. .reduce() sintaxis: array.reduce((acumulador, elemento) => nuevoAcumulador, valorInicial)
   - acumulador: valor que se va acumulando (empieza en valorInicial)
   - elemento: elemento actual del array
   - Siempre devuelve el acumulador actualizado
   
2. Desestructuración en objetos:
   - const { prop1, prop2 } = objeto;
   - En parámetros: const func = ({ prop1, prop2 }) => { ... }
   
3. Desestructuración en arrays:
   - const [primero, segundo] = array;
   - Rest operator: const [primero, ...resto] = array;

4. Usa console.log() para debuggear paso a paso
5. Combinar métodos es muy potente: .filter().map().reduce()
*/