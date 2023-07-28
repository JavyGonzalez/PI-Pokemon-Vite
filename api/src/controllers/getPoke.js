const axios = require('axios');
const { Pokemon, Type } = require('../db')
const URL = 'https://pokeapi.co/api/v2/pokemon?limit=120';

const getPoke = async (req, res) => {
    try {

        const { name } = req.query;

        //Pregunto si NO hay query
        if (!name) {


            //Realizo la solicitud a la API y guardamos en response
            const response = await axios.get(URL);

            //Accedemos al results de la petición de data
            const { results } = response.data;

            // Creamos un array de promesas usando la función map. Donde cada promesa
            //es el detalle individual de cada pokemon
            const pokemonDetailsPromises = results.map(({ url }) => axios.get(url));

            //Con Promise.all esperamos que se completen todas las peticiones
            //anteriores para obtener un array
            const pokemonDetailsResponses = await Promise.all(pokemonDetailsPromises);

            //Usando la función map de polemonDetailsResponses para acceder
            //a los datos de cada respuesta y obtener un array de cada pokemon detallado
            const pokemonDetails = pokemonDetailsResponses.map(response => response.data);

            //Iteramos con map sobre el array de detealles de pokemones
            // y destructuramos las propiedades que deseamos
            const todosPoke = pokemonDetails.map(({id, name, sprites, stats, height, weight, types }) => ({
                id,
                name,
                //Accedemos a la URL de la imagen del pokemon
                img: sprites.front_default,

                //Buscamos las estadisticas de cada pokemon y extraemos el campo base_stat
                hp: stats.find(stat => stat.stat.name === 'hp').base_stat,
                attack: stats.find(stat => stat.stat.name === 'attack').base_stat,
                defense: stats.find(stat => stat.stat.name === 'defense').base_stat,
                speed: stats.find(stat => stat.stat.name === 'speed').base_stat,
                height,
                weight,
                types: types.map(type => type.type.name)
            }));

            //Pido los pokemones de la BD con el tipo incluido
           const dbPokemons = await Pokemon.findAll({include: [Type]});
            
           //Devuelvo los pokemones de la API junto a los de la BD
            const allPokemons = [...todosPoke, ...dbPokemons];
            //Retornamos todos los pokemones con sus detalles
            return res.status(200).json(allPokemons);

        } else {

            //Guardo la respuesta a la solucitud de la API         
            const response = await axios.get(`${URL}?name=${name.toLowerCase()}`);

            //Pregunto si hay datos
            if(response.data.results.length > 0){

                //Guardo el resultado en un arreglo de objetos que tiene el name y la URL
                const poke = response.data.results;
    
                //Busco el pokemon en el arreglo y lo devuelvo
                const pokeBuscado = poke.find(pokemones => pokemones.name === name);
                

                //Pregunto si encontró el pokemon
                if(pokeBuscado){
                     //Gardo la info que se encuentra en la url obtenida
                    const pokemonResponse = await axios.get(pokeBuscado.url);
                    //Guardo los detalles de los pokemones
                    const pokemonDetails = pokemonResponse.data;

                   
                    // Combinar los datos del Pokémon encontrado con los detalles adicionales
                    const pokemonData = {
                        id: pokemonDetails.id,
                        name: pokemonDetails.name,
                        img: pokemonDetails.sprites.front_default,
                        hp: pokemonDetails.stats.find((stat) => stat.stat.name === 'hp').base_stat,
                        attack: pokemonDetails.stats.find((stat) => stat.stat.name === 'attack').base_stat,
                        defense: pokemonDetails.stats.find((stat) => stat.stat.name === 'defense').base_stat,
                        speed: pokemonDetails.stats.find((stat) => stat.stat.name === 'speed')?.base_stat || null,
                        height: pokemonDetails.height,
                        weight: pokemonDetails.weight,
                        types: pokemonDetails.types.map((type) => type.type.name),
                    };
                    
                    res.status(200).json(pokemonData)
                    
                }else{
                    
                    //Busco el pokemon en la base de datos
                    const pokeNameBd = await Pokemon.findOne({where: {name},include: [Type]});

                    //Pregunto si existe el pokemon en la BD
                    if(pokeNameBd){
                        
                        //Devuelvo el nombre
                        res.status(200).json(pokeNameBd);
                    }else{
                        res.status(400).json('No se encontó el pokemon en la BD')
                    }
                }
            }
        }

    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = getPoke;