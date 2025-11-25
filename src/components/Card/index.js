import React from 'react';
import AppContext from '../../context';
import styles from './Card.module.scss';

function Card({
  id,
  title,
  imageUrl,
  price,
  onFavorite,
  onPlus,
  loading = false,
}) {
  const { isItemAdded, favorites } = React.useContext(AppContext);
  const isFavorite = favorites.some((obj) => Number(obj.id) === Number(id));
  const obj = { id, title, imageUrl, price };

  const onClickPlus = () => {
    onPlus(obj);
  };

  const onClickFavorite = () => {
    onFavorite(obj);
  };

  console.log('Card - id:', id, 'isFavorite:', isFavorite, 'favorites:', favorites);

  return (
    <div className={styles.card}>
      {loading ? (
        <div>Загрузка...</div>
      ) : (
        <>
          {onFavorite && (
            <div className={styles.favorite} onClick={onClickFavorite}>
              <img src={isFavorite ? '/img/liked.svg' : '/img/unliked.svg'} alt="Unliked" />
            </div>
          )}
          <img width="100%" height={135} src={imageUrl} alt="Sneakers" />
          <h5>{title}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>{price} руб.</b>
            </div>
            {onPlus && (
              <img
                className={styles.plus}
                onClick={onClickPlus}
                src={isItemAdded(id) ? '/img/btn-checked.svg' : '/img/btn-plus.svg'}
                alt="Plus"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Card;