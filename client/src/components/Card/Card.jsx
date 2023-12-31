    import React from "react";
    import style from './Card.module.css'
    import PathRoutes from "../../helpers/Routes.helper";
    import { Link } from "react-router-dom";
    

    export default function Card ({id, name, img, types, attack}){

        return(
            
                <div  className={style.pokemonCard}>
                    <Link to={PathRoutes.DETAIL.replace(':id', id)}>
                        <h3 className={style.pokemonName}>{name}</h3>
                    </Link>
                    <h5 className={style.pokemonTypes}>{types}</h5>
                    <h4 className={style.pokemonAttack}>{attack}</h4>
                    <img className={style.pokemonImg} src={img} alt="Img not found"/>
                </div>
            
        )

    }