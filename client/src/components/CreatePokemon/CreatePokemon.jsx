import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getTypes, postPoke } from '../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
//import siluetaPoke from '../Image/Silueta.png';
import PathRoutes from '../../helpers/Routes.helper';
import validate from './Validations';
import style from '../CreatePokemon/CreatePokemon.module.css';


export default function PokeCreated(){

    const dispatch = useDispatch();
    const history = useNavigate();
    const tipos = useSelector((state) => state.types);
    const [input, setInput] = useState({
            "name": '',
            "hp": '',
            "attack": '',
            "defense": '',
            "speed": '',
            "height": '',
            "weight": '',
            "img": '',
            "type": []
    })

    const [errorInput, setErrorInput] = useState({});

    function handleChange(ev){
        const {name, value} = ev.target;
        setInput({
            ...input,
            [name] : value
        })
        setErrorInput(validate({
            ...input,
            [name] : value,
            type: input.type || [],
        }))
    }


    function handleSelect(ev){
        setInput({
            ...input,
            type: [...input.type, ev.target.value]
        })
    }

 console.log(Object.keys(errorInput));
    function handleSubmit(ev){
        ev.preventDefault();
            dispatch(postPoke(input));
            alert('Pokemón creado!!!')
            setInput({
                "name": '',
                "hp": '',
                "attack": '',
                "defense": '',
                "speed": '',
                "height": '',
                "weight": '',
                "img": '',
                "type": []
            })
            history('/home')
        }

    function handleDelte(tip){
        setInput({
            ...input,
            type: input.type.filter(t => t !== tip)
        })
    }

    useEffect(() => {
        dispatch(getTypes());
    }, []);

    return(
        <div>
            <Link to={PathRoutes.HOME}><button className={style.btn}>Vovler</button></Link>
            <h1 className={style.title}>Creá tu Pokemón</h1>
            <form onSubmit={(ev) => handleSubmit(ev)}>
                <div className={style.pokemonCard}>

                <div>
                    <label>Nombre: </label>
                    <input type='text' value={input.name}
                    name= 'name'
                    onChange={handleChange}/>
                    {errorInput.name1 ? (
                        <p className={style.error}>{errorInput.name1}</p>
                        ) : errorInput.name2 ? (
                            <p className={style.error}>{errorInput.name2}</p>
                            ) : (
                                <p className={style.error}>{errorInput.name3}</p>
                        )}
                </div>
                <div>
                    <label>Vida: </label>
                    <input type='number' value={input.hp}
                    name= 'hp'
                    onChange={handleChange}/>
                     {errorInput.hp1 ? (
                         <p className={style.error}>{errorInput.hp1}</p>
                        ) :(
                            <p className={style.error}>{errorInput.hp2}</p>
                            )}
                </div>
                <div>
                    <label>Ataque: </label>
                    <input type='number' value={input.attack}
                    name= 'attack'
                    onChange={handleChange}/>
                    {errorInput.attack1 ? (
                        <p className={style.error}>{errorInput.attack1}</p>
                        ) :(
                            <p className={style.error}>{errorInput.attack2}</p>
                            )}
                </div>
                <div>
                    <label>Defensa: </label>
                    <input type='number' value={input.defense}
                    name= 'defense'
                    onChange={handleChange}/>
                    {errorInput.defense1 ? (
                        <p className={style.error}>{errorInput.defense1}</p>
                        ) :(
                            <p className={style.error}>{errorInput.defense2}</p>
                            )}
                </div>
                <div>
                    <label>Velocidad: </label>
                    <input type='number' value={input.speed}
                    name= 'speed'
                    onChange={handleChange}/>
                    {errorInput.speed1 ? (
                        <p className={style.error}>{errorInput.speed1}</p>
                        ) :(
                            <p className={style.error}>{errorInput.speed2}</p>
                            )}
                </div>
                <div>
                    <label>Altura: </label>
                    <input type='number' value={input.height}
                    name= 'height'
                    onChange={handleChange}/>
                    {errorInput.height1 ? (
                        <p className={style.error}>{errorInput.height1}</p>
                        ) :(
                            <p className={style.error}>{errorInput.height2}</p>
                            )}
                </div>
                <div>
                    <label>Peso: </label>
                    <input type='number' value={input.weight}
                    name= 'weight'
                    onChange={handleChange}/>
                    {errorInput.weight1 ? (
                        <p className={style.error}>{errorInput.weight1}</p>
                        ) :(
                        <p className={style.error}>{errorInput.weight2}</p>
                        )}
                </div>
                <div>
                    <label>Imagen: </label>
                    <input type='text' value={input.img}
                    name= 'img'
                    onChange={handleChange}/>
                     {errorInput.img1 ? (
                         <p className={style.error}>{errorInput.img1}</p>
                         ) :(
                             <p className={style.error}>{errorInput.img2}</p>
                             )}
                </div>
                <label>Tipos: </label>
                <select onChange={handleSelect}>
                    {tipos.map((types)=> {
                        return(
                            <option value={(types.name)}>{types.name}</option>
                            )
                        })}
                     {errorInput.type1 ? (
                         <p className={style.error}>{errorInput.type1}</p>
                         ) :(
                             <p className={style.error}>{errorInput.type2}</p>
                             )}
                </select>
                <br/>
                <br/>
                <br/>
                <button className={style.btnCrear} onSubmit={handleSubmit}>Crear Pokemón</button>
            </div>
                
            </form>
            {input.type.map((tip) =>
                <div className={style.container-tipos}>

                <div className={style.divTipo}>
                        <p>{tip}</p>
                        <button className='botonX' onClick={()=> handleDelte(tip)}>x</button>
                </div>
                </div> 
            )}
                    
        </div>
    )
}

