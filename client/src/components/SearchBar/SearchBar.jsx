import React, {useState} from 'react';
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
    

 function handleSubmit(ev) {
     ev.preventDefault();
     dispatch(getPokeByName(name));
   }

   return (
      <div className={style.contenedor}>
         <div className={style.barra}>
            <input className={style.input} type='search' value={name} placeholder='Buscar Pokemón...' onChange={(e)=> {handleInputChange(e)}}/>
            <button className={style.btn} type='submit' onClick={(e)=> handleSubmit(e)}> Buscar </button>
         </div>;
      </div>);
}
