import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import NavBar from '../NavBar/NavBar'
import { getPokemons, orderPokeByName, orderPokeByAttack, filterPokemonsByType, getTypes, filterCreated, getPokeByName } from "../../redux/actions";
//import {Link} from 'react-router-dom';
import Card from '../Card/Card';
import Paginated from "../Paginated/Paginated";
import style from '../Home/Home.module.css'



export default function Home (){

    const dispatch = useDispatch();
    //Me trae del Reducer el estado de todos los pokemones
    const allPokemons = useSelector((state) => state.pokemones) //Igual que hacer mapStateToProps
    //Guardar el estado de la pagina actual y setear el estado de la pagina actual.
    //El useState(1) es porque siempre voy a comenzar en la pagina 1
    const [currentPage, setCurrentPage] = useState(1);
    //Guardame el estado guardame cuantos Pokemones guardo por pagina, en este caso 6.
    const [pokePerPage, setPokePerPage] = useState(12);
    



    const [sortPoke, setSortPoke] = useState(false);
    //El índice del ultimo Pokemon por página.
    const indexOfLastPokemon = currentPage * pokePerPage;
    //El índice del primer Pokemon por página
    const indexOfFirstPokemon = indexOfLastPokemon - pokePerPage;
    //Se va guardando los poekemones por pagina
   // const currentPoke = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);
   const currentPoke = Array.isArray(allPokemons) ? allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon) : [];

    const types = useSelector(state => state.types)
    
    
    useEffect(()=>{
        dispatch(getTypes());
        dispatch(getPokemons()); 
        dispatch(getPokeByName())//Igual que hacer mapDispatchToProps

    }, [dispatch])//Si no funciona borrar dispatch del arreglo

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const handleOrderPokeByName = (ev)=>{
        dispatch(orderPokeByName(ev.target.value));
        setSortPoke(!sortPoke);
    }

    const handleOrderPokeByAttack = (ev)=>{
        dispatch(orderPokeByAttack(ev.target.value));
        setSortPoke(!sortPoke);
    }


    function handleClick(ev){
        ev.preventDefault();
        dispatch(getPokemons());
    }

    function handleFilterByType(e){
        dispatch(filterPokemonsByType(e.target.value));
    }

    function handleFilterCreated(e){
        dispatch(filterCreated(e.target.value))
    }
      

    return(
        <div>
            <NavBar/>            
            <button>Crear Pokemon</button>
            <h1>POKEMONES</h1>
            <button onClick={ev => handleClick(ev)}>
                Volver a cargar todos los Pokemones
            </button>
            <div>
                <select onChange={handleOrderPokeByName}>
                    <option value=' '>Seleccione una opción...</option>
                    <option value='asc'>Ascendente</option>
                    <option value='desc'>Descendente</option>
                </select>
                <select onChange={handleOrderPokeByAttack}>
                    <option value=' '>Seleccione una opción...</option>
                    <option value='asc'>Ascendente</option>
                    <option value='desc'>Descendente</option>
                </select>
                <select onChange={e => handleFilterByType(e)}>
                    <option value="All">All types</option>
                    {
                        types.map( type => (
                            <option value={type.name} key={type.name}>{type.name}</option>
                        ))
                    }
                </select>
                <select onChange={handleFilterCreated}>
                    <option value='All'>Seleccione una opción...</option>
                    <option value='created'>Creados</option>
                    <option value='api'>API</option>
                </select>

                <Paginated className={style.contenedor}
                    pokePerPage={pokePerPage}
                    allPokemons={allPokemons.length}
                    paginado={paginado}
                />

                {currentPoke?.map((p)=>{
                    return(
                        <div key={p.id}>
                            <p to={'/home/' + p.id}>
                                <Card name={p.name} img={p.img} types={p.types.join(' - ')} />
                            </p>
                        </div>
                    );
                    })
                }

            </div>
        </div>
    )
}