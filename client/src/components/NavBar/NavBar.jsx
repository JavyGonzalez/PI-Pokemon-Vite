//React
import React from "react";
//Components
import SearchBar from "../SearchBar/SearchBar";
//Style
import style from './NavBar.module.css';
import logoPoke from '../Image/LogoPokemon.png'

export default function Nav (props) {

    const { onSearch} = props;
    
    return (

        <div className={style.contenedor}>
            <img className={style.logo} src={logoPoke} alt=""/>
            <SearchBar onSearch = {onSearch} />
        </div>
        
    )
    
}

