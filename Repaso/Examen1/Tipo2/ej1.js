const productos = [ 
    {nombre: "Poke Ball", precio: 200, stock: 5}, 
    {nombre: "Super Ball", precio: 600, stock: 3}, 
    {nombre: "Poción", precio: 300, stock: 4}, 
    {nombre: "Antídoto", precio: 200, stock: 2}, 
    {nombre: "Revivir", precio: 2000, stock: 1} 
];

const jugador = {
    nombre: "Pepe",
    dinero: 2500,
    mochila: []
};

const filtrarProductos = (productos) => {
    return productos.filter((producto) => producto.stock > 0);
};

const mostrarProductos = (productos) => {
    console.log("Los productos disponibles son: ")
    productos.forEach(producto => {
        let {nombre, precio, stock} = producto;
        console.log(`${nombre}, Precio: ${precio}, Stock: ${stock}`);
    });
};

const mostrarDineroJugador = (jugador) => {
    console.log(`El dinero actual del jugador es de  ${jugador.dinero} pokeyenes`);
}

let preguntaProducto = "";
let productoEscogido;

do{

    let productosFiltrados = filtrarProductos(productos);
    mostrarProductos(productosFiltrados);
    mostrarDineroJugador(jugador);

    preguntaProducto = prompt("¿Qué producto desea comprar? (escribe 'salir' para terminar)");
    
    if(preguntaProducto.toLowerCase() === "salir") break;
    
    productoEscogido = productosFiltrados.find((producto) => {
        return producto.nombre.toLowerCase() === preguntaProducto.trim().toLowerCase();
    });
    
    console.log(productoEscogido);

    if(!productoEscogido) {
        alert("Error: Producto no encontrado");
        continue; // Vuelve al inicio del bucle
    }

    if(productoEscogido.precio > jugador.dinero) {
        alert("Aléjate sucia rata pobre");
        continue; // Vuelve al inicio del bucle
    }

    jugador.dinero -= productoEscogido.precio;
    productoEscogido.stock--;
    jugador.mochila.push(productoEscogido);

    let stockAgotado = productos.every(producto => producto.stock <= 0);
    
    if(stockAgotado) {
        alert("¡Se acabó el stock de todos los productos!");
        break;
    }

} while(jugador.dinero >= 200); 

console.log(`El dinero final del jugador es de ${jugador.dinero} pokeyenes`);

console.log("Contenido de la mochila:");
jugador.mochila.forEach((item, indice) => {
    console.log(`Item ${indice + 1}: ${item.nombre} | Precio: ${item.precio}`);
});

