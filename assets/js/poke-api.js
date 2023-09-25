


const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types


    pokemon.types = types 
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url) //requisição para o servidor
        .then((response) => response.json()) //converter a response para json
        .then((jsonBody) => jsonBody.results) //criamos uma lista com o json obtido
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail)) //tranformar a primeira lista em lista de promises de detalhes do pokemon ja convertido em json
        .then((detailRequests) => Promise.all(detailRequests)) //aguarda a realização e o término de todas as requests
        .then((pokemonsDetails) => pokemonsDetails)


}

