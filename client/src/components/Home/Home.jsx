import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
//import NavBar from '../NavBar/NavBar'
import { getPokemons, 
    orderPokeByName, 
    orderPokeByAttack, 
    filterPokemonsByType, 
    getTypes, 
    filterCreated } from "../../redux/actions";
//import {Link} from 'react-router-dom';
import Card from '../Card/Card';
import Paginated from "../Paginated/Paginated";
import style from '../Home/Home.module.css';

export default function Home (){

    const dispatch = useDispatch();
    //Me trae del Reducer el estado de todos los pokemones
    const allPokemons = useSelector((state) => state.pokemones) //Igual que hacer mapStateToProps
    //Guardar el estado de la pagina actual y setear el estado de la pagina actual.
    //El useState(1) es porque siempre voy a comenzar en la pagina 1
    const [currentPage, setCurrentPage] = useState(1);
    
    const [sortPoke, setSortPoke] = useState([]);
    const [pokeLoaded, setPokeLoaded] = useState(allPokemons.length ? true : false);

    //Guardame el estado guardame cuantos Pokemones guardo por pagina, en este caso 6.
    const [pokePerPage, setPokePerPage] = useState(12);   
    //El índice del ultimo Pokemon por página.
    const indexOfLastPokemon = currentPage * pokePerPage;
    //El índice del primer Pokemon por página
    const indexOfFirstPokemon = indexOfLastPokemon - pokePerPage;
    //Se va guardando los poekemones por pagina
   const currentPoke = Array.isArray(allPokemons) 
   ? allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon) 
   :[allPokemons];

    const types = useSelector(state => state.types)
    

    useEffect(()=>{
        dispatch(getTypes());
        if(!pokeLoaded){
            dispatch(getPokemons()); //Igual que hacer mapDispatchToProps
        }
    }, [pokeLoaded, dispatch])

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

   
    const handleOrderPokeByName = (ev)=>{
        dispatch(orderPokeByName(ev.target.value));
        setSortPoke([...sortPoke, ev.target.value]);
    }

    const handleOrderPokeByAttack = (ev)=>{
        dispatch(orderPokeByAttack(ev.target.value));
        setSortPoke([...sortPoke, ev.target.value]);
    }

    const handleOrderPokeByAttackMasSesenta = (ev) => {

        
    }


    function handleFilterByType(ev){
        dispatch(filterPokemonsByType(ev.target.value));
        setCurrentPage(1);
        setSortPoke([...sortPoke, ev.target.value]);
    }

    function handleFilterCreated(ev){
        dispatch(filterCreated(ev.target.value))
        setCurrentPage(1); 
        setSortPoke([...sortPoke, ev.target.value]);    
    } 

    return(
        
        <div  className={style.body}>
                 
            <h1 className={style.title}>POKEMONES</h1>
            <div>
                <select onChange={handleOrderPokeByName}>
                    <option value='All'>Ordenar por nombre...</option>
                    <option value='asc'>Ascendente</option>
                    <option value='desc'>Descendente</option>
                </select>
                <select onChange={handleOrderPokeByAttack}>
                    <option value='All'>Ordenar por ataque...</option>
                    <option value='asc'>Ascendente</option>
                    <option value='desc'>Descendente</option>
                </select>
                    <option value='All'>Ordenar por ataque mayor que...</option>
                    <option value='60'>Mayor que 60</option>
                <select>

                </select>
                <select onChange={e => handleFilterByType(e)}>
                    <option value="All">Todos los tipos</option>
                       {
                        types.map( type => (
                            <option value={type.name} key={type.name}>{type.name}</option>
                        ))
                    }
                </select>
                <select onChange={handleFilterCreated} value={filterCreated}>
                    <option value='All'>Ordenar por origen...</option>
                    <option value='created'>Creados</option>
                    <option value='api'>API</option>
                </select>
                <Paginated className={style.contenedor}
                    pokePerPage={pokePerPage}
                    allPokemons={allPokemons.length}
                    paginado={paginado}
                />
                <div className={style.cardContainer}>
                    {currentPoke?.map((p)=>{
                        return(
                            <>
                            <Card 
                                    key={p.id}
                                    id={p.id}
                                    name={p.name.toUpperCase()}
                                    attack={p.attack}
                                    img={p.img}
                                    types={Array.isArray(p.types) && p.types[0].name ? (
                                        // Si p.types es un arreglo de objetos (viene de la base de datos)
                                        <p>{p.types.map(type => type.name).join(' - ')}</p>
                                      ) : (
                                        // Si p.types es un arreglo de cadenas (viene de la API)
                                        <p>{p.types.join(' - ')}</p>
                                      )}
                                    
                                />
                            </>
                            );
                        })
                    }
                </div>

            </div>
        </div>
    )
}