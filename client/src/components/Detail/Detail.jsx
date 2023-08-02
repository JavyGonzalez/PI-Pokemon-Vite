import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../redux/actions";
import { useEffect } from "react";
import PathRoutes from "../../helpers/Routes.helper";
import style from '../Detail/Detail.module.css';
import pokeLoad from '../Image/ballpoke.gif';

export default function Detail(){

    const {id} = useParams();
 
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(()=>{
        setLoading(true);
        dispatch(getDetail(id))
        .then(() => setLoading(false))
        .catch(()=> setLoading(false))
    },[dispatch, id]);

    const myPoke = useSelector((state) => state.detail);
    console.log(myPoke);
   
    return(
        <div className={style.container}>
            <h2 className={style.title}>Este es el Detalle del Pokemón</h2>
            {
                loading 
                ? (
                <img src={pokeLoad} alt="Loading..." className={style.pokeLoad}/>)
                : myPoke? (
                <div className={style.pokemonContainer}>
                    <h2>ID: {myPoke.id}</h2>
                    <div className={style.imageContainer}>
                        <img src={myPoke.front_default ? myPoke.front_default : myPoke.img}
                        alt="Pokemón"
                        className={style.pokemonImage}/>
                        <h1 className={style.pokemonName}>{myPoke.name.toUpperCase()}</h1>
                    </div>
                    <div className={style.statsContainer}>
                        <div>
                            <h3>Vida: {myPoke.hp}</h3>
                            <h3>Ataque: {myPoke.attack}</h3>
                        </div>
                        <div>
                            <h3>Defensa: {myPoke.defense}</h3>
                            <h3>Velocidad: {myPoke.speed}</h3>
                        </div>
                        <div>
                            <h3>Peso: {myPoke.weight}</h3>
                            <h3>Altura: {myPoke.height}</h3>
                        </div>
                    </div>
                    <div className={style.typesConatiner}>
                        <h2>Tipo: {Array.isArray(myPoke.types) && myPoke.types[0].name ? (
                                        // Si p.types es un arreglo de objetos (viene de la base de datos)
                                        <p>{myPoke.types.map(type => type.name).join(' - ')}</p>
                                      ) : (
                                        // Si p.types es un arreglo de cadenas (viene de la API)
                                        <p>{myPoke.types.join(' - ')}</p>
                                      )}</h2>
                    </div>
                </div>
                ): <p>Error: No se pudo cargar el detalle del Pokemón.</p>    
            }

            <Link to={PathRoutes.HOME}>
                <button className={style.btn}>Volver</button>
            </Link>

        </div>
    )
}