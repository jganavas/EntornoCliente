const cargarPokemon = async (id) => {
    try{

        const respuestaAPI = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

        if(!respuestaAPI.ok){
            throw new Error("Error en el fetch");
        }

        const pokemon = await respuestaAPI.json();

        console.log(`Nombre Pokemon: ${pokemon["name"]}`);
        console.log(`Peso Pokemon: ${pokemon["weight"]}kg`);

    }catch(e){
        console.log("Error bro");
    }
};

cargarPokemon(8);