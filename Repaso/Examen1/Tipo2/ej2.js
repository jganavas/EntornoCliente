const jugador = { 
  nombre: "Pikachu", 
  vida: 100, 
  ataques: [ 
    {nombre: "Impactrueno", daño: 20}, 
    {nombre: "Placaje", daño: 10}, 
    {nombre: "Rayo", daño: 30} 
  ] 
}; 
 
const enemigo = { 
  nombre: "Charmander", 
  vida: 100, 
  ataques: [ 
    {nombre: "Arañazo", daño: 10}, 
    {nombre: "Ascuas", daño: 20}, 
    {nombre: "Lanzallamas", daño: 30} 
  ] 
};

const elegirAtaqueAleatorio = (enemigo) => {
    let indiceAleatorio = Math.floor(Math.random()*enemigo.ataques.length);

    return enemigo.ataques[indiceAleatorio];
};

const mostrarEstadoJugadores = (jugador, enemigo) => {
    console.log(`Jugador: ${jugador.vida} HP restantes \nEnemigo: ${enemigo.vida} HP restantes `);
};

console.log(elegirAtaqueAleatorio(enemigo));
mostrarEstadoJugadores(jugador, enemigo);

let enemigoDerrotado = false;
let jugadorDerrotado = false;

console.log("¡Comienza la batalla! Pikachu vs Charmander");
mostrarEstadoJugadores(jugador, enemigo);

do{
    let ataque = 0;
    do{
        let nombreAtaque = prompt("Elige un ataque").trim().toLowerCase();
    
        ataque = jugador.ataques.find((ataque) => {
            return ataque.nombre.toLowerCase() === nombreAtaque;
        });

        if(!ataque) alert("El ataque no existe");

    }while(!ataque);

    console.log(`Has usado ${ataque.nombre} Charmander pierde ${ataque.daño}`);

    let ataqueEnemigo = elegirAtaqueAleatorio(enemigo);
    console.log(`Charmander usa ${ataqueEnemigo.nombre}. Pikachu pierde ${ataqueEnemigo.daño}`);

    enemigo.vida -= ataque.daño;
    jugador.vida -= ataqueEnemigo.daño;
    mostrarEstadoJugadores(jugador, enemigo);

    if(enemigo.vida <= 0) enemigoDerrotado = true;
    if(jugador.vida <= 0) jugadorDerrotado = true;

}while(!enemigoDerrotado || !jugadorDerrotado);

if(enemigoDerrotado) console.log("¡Has ganado! Charmander ha sido derrotado.");
if(jugadorDerrotado) console.log("A tu casa parguelilla");