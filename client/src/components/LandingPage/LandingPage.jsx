import React from "react";
import {Link} from 'react-router-dom';
import PathRoutes from "../../helpers/Routes.helper";


export default function LandingPage(){
    return(
        <div>
            <h1>Bienvenidos a la web de Pokemón</h1>
            <Link to={PathRoutes.HOME}>
                <button>Ingresar</button>
            </Link>
        </div>
    )
}