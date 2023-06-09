import React from 'react';
import styles from './Card.module.scss';


function Card({id, title, price, onPlus, image, onFavorite, favorited = false, added = false}){

  const[isAdded, setIsAdded] = React.useState(added);
  const[isFavorite, setIsFavorite] = React.useState(favorited);

  const onClickPlus = () => {
    onPlus({id, title, price, image});
    setIsAdded(!isAdded);
  }

  const onClickFavorite = () => {
    onFavorite({id, title, price, image});
    setIsFavorite(!isFavorite);
  }

return(
<div className = {styles.card}>
  <div className = {styles.favorite} onClick = {onClickFavorite}>
    <img src = {(isFavorite ? "/img/liked.svg" : "/img/unliked.svg")} alt = "like-button"/>
  </div>
      <img width = {110} height = {110} src ={image} alt="Items"/>
      <h5>{title}</h5>
      <div className = "d-flex justify-between align-center">
        <div className = "d-flex flex-column">
          <span>Цена:</span>
          <b>{price} руб.</b>
        </div>
        <img className = {styles.plus} onClick = {onClickPlus} src = {(isAdded ? "/img/btn-plus-check.svg" : "/img/btn-plus.svg")}  alt="Plus"/>
      </div>
      </div>
);
}
export default Card;