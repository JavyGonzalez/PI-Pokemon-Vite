import React from "react";
import {Link} from 'react-router-dom';
import PathRoutes from "../../helpers/Routes.helper";
import landingPoke from '../Image/LandingPage.png'
import style from '../LandingPage/LandingPage.module.css'

export default function LandingPage(){
    return(
        <div className={style.landingPageContainer}>
            <img className={style.landingPage} src={landingPoke} alt=""/>
            <h1>Bienvenidos a la web de Pokemón</h1>
            <Link to={PathRoutes.HOME}>
                <button className={style.btn}>Ingresar</button>
            </Link>
        </div>
    )
}