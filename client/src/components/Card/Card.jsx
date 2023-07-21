    import React from "react";
    import style from './Card.module.css'

    export default function Card ({name, img, types}){
        return(
            <div  className={style.pokemonCard}>
                <h3 className={style.pokemonName}>{name}</h3>
                <h5 className={style.pokemonTypes}>{types}</h5>
                <img className={style.pokemonImg} src={img} alt="img not found" width='200px' heidth='250px'/>
            </div>
        )

    }