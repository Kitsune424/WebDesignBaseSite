import React from 'react';

function IconsPage() {
  return (
    <main className="content p-40">
      <header className="d-flex align-center justify-between mb-40">
        <h1>Библиотека иконок</h1>
        <p className="opacity-6">Дизайн-система React Sneakers</p>
      </header>

      <section className="mb-60">
        <h2 className="mb-30">Иконки из внешних ресурсов</h2>
        <div className="icons-grid">
          {/* Иконка корзины */}
          <div className="icon-item">
            <object 
              type="image/svg+xml" 
              data="https://s.kontur.ru/common-v2/icons-ui/black/trash-can/trash-can-24-Regular.svg"
              className="icon-external"
            >
              Корзина
            </object>
            <span className="icon-name">Корзина</span>
          </div>

          {/* Иконка сердца */}
          <div className="icon-item">
            <object 
              type="image/svg+xml" 
              data="https://s.kontur.ru/common-v2/icons-ui/black/bookmark/bookmark-24-Regular.svg"
              className="icon-external"
            >
              Избранное
            </object>
            <span className="icon-name">Избранное</span>
          </div>

          {/* Иконка пользователя */}
          <div className="icon-item">
            <object 
              type="image/svg+xml" 
              data="https://s.kontur.ru/common-v2/icons-ui/black/people-1-badge/people-1-badge-24-Regular.svg"
              className="icon-external"
            >
              Профиль
            </object>
            <span className="icon-name">Профиль</span>
          </div>

          {/* Иконка заказов */}
          <div className="icon-item">
            <object 
              type="image/svg+xml" 
              data="https://s.kontur.ru/common-v2/icons-ui/black/book-closed/book-closed-24-Regular.svg"
              className="icon-external"
            >
              Заказы
            </object>
            <span className="icon-name">Заказы</span>
          </div>

          {/* Иконка поиска */}
          <div className="icon-item">
            <object 
              type="image/svg+xml" 
              data="https://s.kontur.ru/common-v2/icons-ui/black/search-loupe/search-loupe-24-Regular.svg"
              className="icon-external"
            >
              Поиск
            </object>
            <span className="icon-name">Поиск</span>
          </div>

          {/* Иконка дома */}
          <div className="icon-item">
            <object 
              type="image/svg+xml" 
              data="https://s.kontur.ru/common-v2/icons-ui/black/building-home/building-home-24-Regular.svg"
              className="icon-external"
            >
              Главная
            </object>
            <span className="icon-name">Главная</span>
          </div>

          {/* Иконка настроек */}
          <div className="icon-item">
            <object 
              type="image/svg+xml" 
              data="https://s.kontur.ru/common-v2/icons-ui/black/settings-gear/settings-gear-24-Regular.svg"
              className="icon-external"
            >
              Настройки
            </object>
            <span className="icon-name">Настройки</span>
          </div>

          {/* Иконка уведомлений */}
          <div className="icon-item">
            <object 
              type="image/svg+xml" 
              data="https://s.kontur.ru/common-v2/icons-ui/black/notification-app/notification-app-24-Regular.svg"
              className="icon-external"
            >
              Уведомления
            </object>
            <span className="icon-name">Уведомления</span>
          </div>

          {/* Иконка помощи */}
          <div className="icon-item">
            <object 
              type="image/svg+xml" 
              data="https://s.kontur.ru/common-v2/icons-ui/black/question-circle/question-circle-24-Regular.svg"
              className="icon-external"
            >
              Помощь
            </object>
            <span className="icon-name">Помощь</span>
          </div>

          {/* Иконка выхода */}
          <div className="icon-item">
            <object 
              type="image/svg+xml" 
              data="https://s.kontur.ru/common-v2/icons-ui/black/arrow-ui-auth-logout/arrow-ui-auth-logout-24-Regular.svg"
              className="icon-external"
            >
              Выход
            </object>
            <span className="icon-name">Выход</span>
          </div>
        </div>
      </section>

      <section className="mb-60">
        <h2 className="mb-30">Кастомные инлайн иконки</h2>
        <div className="icons-grid">
          {/* Кастомная иконка карты */}
          <div className="icon-item">
            <svg 
              width="64" 
              height="64" 
              viewBox="0 0 64 64" 
              className="icon-inline discount-icon"
            >
              {/* lab11: Круг - основа иконки */}
              <circle 
                cx="32" 
                cy="32" 
                r="28" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="3"
              />
              
              {/* lab11: Прямоугольник - Карта */}
              <rect 
                x="18" 
                y="18" 
                width="28" 
                height="20" 
                rx="3" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              />
              
              {/* lab11: Линии - Карта */}
              <line 
                x1="22" 
                y1="24" 
                x2="30" 
                y2="24" 
                stroke="currentColor" 
                strokeWidth="2"
              />
              <line 
                x1="22" 
                y1="28" 
                x2="26" 
                y2="28" 
                stroke="currentColor" 
                strokeWidth="2"
              />
              
            </svg>
            <span className="icon-name">Карта</span>
          </div>

          {/* Кастомная иконка доставки */}
          <div className="icon-item">
            <svg 
              width="64" 
              height="64" 
              viewBox="0 0 64 64" 
              className="icon-inline delivery-icon"
            >
              {/* lab11: Прямоугольник - кузов грузовика */}
              <rect 
                x="8" 
                y="24" 
                width="32" 
                height="16" 
                rx="2" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              />
              
              {/* lab11: Прямоугольник - кабина */}
              <rect 
                x="40" 
                y="20" 
                width="16" 
                height="20" 
                rx="2" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              />
              
              {/* lab11: Круги - колеса */}
              <circle 
                cx="16" 
                cy="44" 
                r="6" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              />
              <circle 
                cx="40" 
                cy="44" 
                r="6" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              />
              
              {/* lab11: Линии - детали кузова */}
              <line 
                x1="20" 
                y1="24" 
                x2="20" 
                y2="40" 
                stroke="currentColor" 
                strokeWidth="1"
              />
              <line 
                x1="28" 
                y1="24" 
                x2="28" 
                y2="40" 
                stroke="currentColor" 
                strokeWidth="1"
              />
              
              {/* lab11: Многоугольник - стрелка направления */}
              <polygon 
                points="48,28 56,28 52,24" 
                fill="currentColor" 
              />
            </svg>
            <span className="icon-name">Доставка</span>
          </div>
        </div>
      </section>
    </main>
  );
}

export default IconsPage;