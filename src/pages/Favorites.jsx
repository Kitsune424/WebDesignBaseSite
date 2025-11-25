import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import AppContext from '../context';

function Favorites() {
  const { favorites, onAddToFavorite, onAddToCart } = React.useContext(AppContext);
  const navigate = useNavigate();

  const handleReturnToMain = () => {
    navigate('/');
  };

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои закладки</h1>
      </div>

      <div className="d-flex flex-wrap">
        {favorites.length > 0 ? (
          favorites.map((item) => (
            <Card 
              key={item.id} 
              favorited={true}
              onFavorite={onAddToFavorite}
              onPlus={onAddToCart}
              {...item} 
            />
          ))
        ) : (
          <div className="cartEmpty d-flex align-center justify-center flex-column flex">
            <img className="mb-20" width="120px" src="/img/heart-unliked.png" alt="No favorites" />
            <h2>Закладок нет :(</h2>
            <p className="opacity-6">Вы ничего не добавляли в закладки</p>
            <button onClick={handleReturnToMain} className="greenButton">
              <img src="/img/arrow.svg" alt="Arrow" />
              Вернуться назад
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Favorites;