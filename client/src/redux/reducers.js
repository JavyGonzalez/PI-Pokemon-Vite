const initialState = {
    pokemones: [],
    allPokemones: [],
    types: [],
    allTypes: [],
    detail: null,
};

function rootReducer (state = initialState, action){
    switch(action.type){
        case 'GET_POKEMONS':
            return{
                ...state,
                pokemones: action.payload,
                allPokemones: action.payload
            }
        case 'ORDER_POKE_BY_NAME':
            let allPoke = action.payload === 'asc' ?

                state.pokemones.sort(function(a, b){
                    if (a.name > b.name) {
                        return 1;
                    }
                    if(b.name > a.name){
                        return -1;
                    }
                    return 0;
                }) :
                state.pokemones.sort(function(a, b){
                    if(a.name > b.name){
                        return -1;
                    }
                    if(b.name > a.name){
                        return 1;
                    }
                    return 0; 
                })
            return{
                ...state,
                pokemones: allPoke
            }
            case 'ORDER_POKE_BY_ATTACK':
                let allPokeAttack = action.payload === 'asc' ?
    
                    state.pokemones.sort(function(a, b){
                        if (a.attack > b.attack) {
                            return 1;
                        }
                        if(b.attack > a.attack){
                            return -1;
                        }
                        return 0;
                    }) :
                    state.pokemones.sort(function(a, b){
                        if(a.attack > b.attack){
                            return -1;
                        }
                        if(b.attack > a.attack){
                            return 1;
                        }
                        return 0; 
                    })
                return{
                    ...state,
                    pokemones: allPokeAttack
                }
            case 'ORDER_POKE_BY_ATTACK_MAS_SESENTA':
                let allPokeAttackMasSesenta = action.payload === ''    
            return{
                    
                }
            case 'GET_POKE_BY_NAME':
                return{
                    ...state,
                    pokemones: action.payload
                }
            case "GET_TYPES":
                return {
                    ...state,
                    types: action.payload,
                    allTypes: action.payload
                }
            case 'FILTER_BY_TYPES':
                const allPokemones = state.allPokemones;
                const filteredPokemons = action.payload === "All" 
                ? allPokemones 
                :allPokemones.filter((poke) => {
                    if(Number.isInteger(poke.id)){
                        //Tipos de la API
                         return poke.types.includes(action.payload);
                    }else{
                        //Tipos de la BD
                        return poke.types.map((type) => type.name);    
                    }
                })
               
                return {
                    ...state,
                    pokemones: filteredPokemons
                };

            case 'FILTER_CREATED':
                const createdFilter = action.payload === 'api' 
                ? state.allPokemones.filter(poke => Number.isInteger(poke.id)) 
                : state.allPokemones.filter(poke => !Number.isInteger(poke.id))
                return{
                    ...state,
                    pokemones: action.payload === 'All'
                    ? state.allPokemones
                    : createdFilter
                }
            case 'POST_POKE':
                return{
                    ...state,
                }
            case 'GET_DETAILS':
                return{
                    ...state,
                    detail: action.payload
                }

        default:
            return state;
    }
}

export default rootReducer;
