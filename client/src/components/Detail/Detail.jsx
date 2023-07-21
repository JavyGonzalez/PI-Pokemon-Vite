import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../redux/actions";
import { useEffect } from "react";
import PathRoutes from "../../helpers/Routes.helper";

export default function Detail(props){

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getDetail(props.match.params.id));
    },[dispatch]);

    const myPoke = useSelector((state) => state.detail)


    return(
        <div>
            <h1>Este es el Detalle del Pokemon</h1>
            {
                myPoke.length > 0 ?
                <div>
                    <h1>{myPoke.name}</h1>
                    <img src={myPoke.img? myPoke.img : myPoke.image}/>
                    <h1>{myPoke.type + ' '}</h1>
                </div>
                : <p>Loading...</p>    
            }

            <Link to={PathRoutes.HOME}>
                <button>Volver</button>
            </Link>

        </div>
    )
}