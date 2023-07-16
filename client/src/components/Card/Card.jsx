import React from "react";

export default function Card ({name, img, types}){
    return(
        <div>
            <h3>{name}</h3>
            <h5>{types}</h5>
            <img src={img} alt="img not found" width='200px' heidth='250px'/>
        </div>
    )

}