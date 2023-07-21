//React
import React from 'react';
//Components
import Card from '../Card/Card';
//Style
import style from './Cards.module.css';

export default function Cards(props) {

   const {currentPoke} = props;

   const pokeCards = currentPoke.map((pokemons) => {
     return (
      <Card 
      key={pokemons.id}
      id={pokemons.id}
      name={pokemons.name}
      types={pokemons.types.join(' - ')}
      image={pokemons.img}

    />
     ) 
   });
   return <div className={style.divCards}>{pokeCards}</div>;
}