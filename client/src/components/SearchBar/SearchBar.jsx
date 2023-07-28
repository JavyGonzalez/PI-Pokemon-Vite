import React, { useState} from 'react';
import style from './SearchBar.module.css';
import { useDispatch } from 'react-redux';
import { getPokeByName } from '../../redux/actions';



export default function SearchBar(props) {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
  

   function handleInputChange(ev) {
     ev.preventDefault();
     setName(ev.target.value);
   }
    

   function handleSubmitByName(ev) {
      ev.preventDefault();
         if(name.trim()===''){
            window.alert('Ingrese un Pokémon.\nPor favor, ingrese un nombre válido.')
         }else{
            dispatch(getPokeByName(name))
            .then((response) =>{
               if(!response){
                  window.alert('No se encontró Pokemón con ese nombre. \nPor favor ingrese otro nombre.')
               }
            })
            .catch((error) => {
               window.alert('Hubo un error al buscar el Pokemón. \nInténte nuevamente.')
            })
            setName('');
         }
      }

   return (
      <div className={style.contenedor}>
         <div className={style.barra}>
            <input className={style.input} type='search' value={name} placeholder='Buscar Pokemón...' onChange={(e)=> {handleInputChange(e)}}/>
            <button className={style.btn} type='submit' onClick={(e)=> handleSubmitByName(e)}>Buscar</button>
         </div>;
      </div>);
}
