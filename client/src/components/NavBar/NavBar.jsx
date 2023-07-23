//React
import React from "react";
//Components
import SearchBar from "../SearchBar/SearchBar";
//Style
import style from './NavBar.module.css';
import logoPoke from '../Image/LogoPokemon.png'
import PathRoutes from "../../helpers/Routes.helper";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getPokemons } from "../../redux/actions";

export default function Nav (props) {

    const { handleSubmit} = props;
    const dispatch = useDispatch();

    function handleClick(ev){
        ev.preventDefault();
        dispatch(getPokemons());
    }
    
    return (

        <div className={style.contenedor}>
            <img className={style.logo} src={logoPoke} alt=""/>
            <Link to={PathRoutes.CREATEPOKE}><button className={style.btn}>Crear Pokemon</button></Link>    
            <button className={style.btn} onClick={ev => handleClick(ev)}>
                Volver a cargar todos los Pokemones
            </button>
            <SearchBar onClick = {handleSubmit} />
        </div>
        
    )
    
}

