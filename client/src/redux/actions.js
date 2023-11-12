import axios from 'axios';

export const GET_POKEMONS = 'GET_POKEMONS';
export const ORDER_POKE_BY_NAME = 'ORDER_POKE_BY_NAME';
export const ORDER_POKE_BY_ATTACK = 'ORDER_POKE_BY_ATTACK';
export const GET_POKE_BY_NAME = 'GET_POKE_BY_NAME';
export const GET_TYPES ='GET_TYPES';
export const FILTER_BY_TYPES = 'FILTER_BY_TYPES';
export const FILTERED_POKEMONS = 'FILTERED_POKEMONS';
export const FILTER_CREATED = 'FILTER_CREATED';
export const POST_POKE = 'POST_POKE';
export const GET_DETAILS = 'GET_DETAILS'
export const ORDER_POKE_BY_ATTACK_MAS_SESENTA = 'ORDER_POKE_BY_ATTACK_MAS_SESENTA'

const endpoint = 'http://localhost:3001/pokemons/';
const endpointtypes = 'http://localhost:3001/types';
const endpointName = 'http://localhost:3001/pokemons?name=';


export function getPokemons(){

    return async function(dispatch){
        
        try {
            const {data} = await axios(endpoint);
            const pokeArray = Array.isArray(data) ? data:[data]
            return dispatch({
                type: 'GET_POKEMONS',
                payload: pokeArray
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function orderPokeByName(order){
    return{
        type: 'ORDER_POKE_BY_NAME',
        payload: order
    }
}

export function orderPokeByAttack(order){
    return{
        type: 'ORDER_POKE_BY_ATTACK',
        payload: order
    }
}

export function OrderPokeByAttackMasSesenta(attack){
    return{
        type: 'ORDER_POKE_BY_ATTACK_MAS_SESENTA',
        payload: attack
    }
}

export function getPokeByName(name){
    return async function(dispatch){
        try {
            const {data} = await axios(endpointName + name)
            const pokeArray = Array.isArray(data) ? data:[data];
            return dispatch({
                type: 'GET_POKE_BY_NAME',
                payload: pokeArray
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function getTypes(){
    return async function(dispatch){
        try {
            const response = await axios.get(endpointtypes);
            const types = response.data;
            
            return dispatch({ 
                type:"GET_TYPES",
                payload: types
    
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function filterPokemonsByType(payload){
    return {
        type:"FILTER_BY_TYPES",
        payload
    }
}

export function filterCreated(payload){
    return{
        type: 'FILTER_CREATED',
        payload
    }
}

export function postPoke(payload){
    return async function(dispatch){
        const data = await axios.post(endpoint, payload);
        
        return data;
    }
}

export function getDetail(id){
    return async function(dispatch){
        try {
            const {data} = await axios.get(endpoint+id)

            return dispatch({
                type: 'GET_DETAILS',
                payload: data,
            })
        } catch (error) {
            console.log(error);
        }
    }
}



