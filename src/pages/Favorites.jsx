import React from 'react';
import Card from '../components/Card';
import AppContext from '../context';

function Favorites() {
  const { favorites, onAddToFavorite, onAddToCart } = React.useContext(AppContext);

  return (
    <main className="content p-40">
      <header className="d-flex align-center justify-between mb-40">
        <h1>Мои закладки</h1>
        {favorites.length > 0 && (
          <nav aria-label="Действия с избранным">
            <small className="opacity-6">
              Найдено товаров: <strong>{favorites.length}</strong>
            </small>
          </nav>
        )}
      </header>

      <section aria-labelledby="favorites-heading">
        <h2 id="favorites-heading" className="visually-hidden">Избранные товары</h2>
        
        {favorites.length > 0 ? (
          <article className="favorites-content">
            <div className="d-flex flex-wrap">
              {favorites.map((item) => (
                <Card 
                  key={item.id} 
                  favorited={true} 
                  onFavorite={onAddToFavorite}
                  onPlus={onAddToCart}
                  {...item} 
                />
              ))}
            </div>
          </article>
        ) : (
          <article className="empty-favorites text-center">
            <img width={120} height={120} src="/img/heart-unliked.png" alt="Нет закладок" />
            <h2>Закладок нет</h2>
            <p className="opacity-6 mb-20">
              Вы еще ничего не добавляли в закладки. <em>Найдите понравившиеся товары</em> и добавьте их сюда!
            </p>
            <aside className="favorites-tips">
              <h3>💡 <mark>Почему стоит использовать закладки?</mark></h3>
              <ul style={{ textAlign: 'left', display: 'inline-block' }}>
                <li><small>Быстрый доступ к понравившимся товарам</small></li>
                <li><small>Сравнение цен и характеристик</small></li>
                <li><small>Не потеряете интересные предложения</small></li>
              </ul>
            </aside>
          </article>
        )}
      </section>
    </main>
  );
}

export default Favorites;