import React from 'react';
import Card from '../components/Card';

function Home({
  items,
  searchValue,
  setSearchValue,
  onAddToFavorite,
  onAddToCart,
}) {
  const renderItems = () => {
    const filtredItems = items.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase()),
    );
    return filtredItems.map((item) => (
      <Card
        key={item.id}
        onFavorite={onAddToFavorite}
        onPlus={onAddToCart}
        {...item}
      />
    ));
  };

  return (
    <main className="content p-40">
      <header className="d-flex align-center justify-between mb-40">
        <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1>
        <nav className="search-block d-flex" aria-label="Поиск товаров">
          <img src="/img/search.svg" alt="Поиск" />
          {searchValue && (
            <img
              onClick={() => setSearchValue('')}
              className="clear cu-p"
              src="/img/btn-remove.svg"
              alt="Очистить поиск"
            />
          )}
          <input 
            onChange={(e) => setSearchValue(e.target.value)} 
            value={searchValue} 
            placeholder="Поиск..." 
            aria-label="Введите поисковый запрос"
          />
        </nav>
      </header>

      <section aria-labelledby="products-heading">
        <h2 id="products-heading" className="visually-hidden">Каталог товаров</h2>
        {items.length > 0 ? (
          <div className="d-flex flex-wrap">
            {renderItems()}
          </div>
        ) : (
          <article className="no-products">
            <p><strong>Товары не найдены</strong>. Попробуйте изменить поисковый запрос.</p>
            <small>Или свяжитесь с нашей службой поддержки для помощи.</small>
          </article>
        )}
      </section>

      <aside className="promo-banner mt-40" style={{
        background: 'linear-gradient(45deg, #9dd558, #7b68ee)',
        borderRadius: '20px',
        padding: '30px',
        color: 'white',
        textAlign: 'center'
      }}>
        <h3>🎉 <mark>Специальное предложение!</mark></h3>
        <p>При покупке от <strong>2 пар</strong> кроссовок — <em>скидка 10%</em> на весь заказ!</p>
        <small>Акция действует до конца месяца</small>
      </aside>
    </main>
  );
}

export default Home;