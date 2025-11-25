import React, { useState, useEffect } from 'react';
import $ from 'jquery'; // LAB: Добавляем jQuery

function FeaturesPage() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [email, setEmail] = useState('');
  const [subscriptionMessage, setSubscriptionMessage] = useState('');

  // LAB: Переключение темы
  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, [isDarkTheme]);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  // LAB: Форма подписки
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscriptionMessage(`Адрес ${email} успешно добавлен в список рассылки`);
      setEmail('');
    }
  };

  // LAB: Cookies уведомление - простой jQuery для скрытия
  useEffect(() => {
    // Обработчик кнопки с использованием jQuery
    $('#cookiesAcceptButton').on('click', function() {
      // LAB: jQuery анимация скрытия
      $('#cookiesBanner').slideUp(300, function() {
        console.log('Cookies баннер скрыт с помощью jQuery');
      });
    });

    // Очистка при размонтировании
    return () => {
      $('#cookiesAcceptButton').off('click');
    };
  }, []);

  return (
    <main className="content p-40">
      <header className="d-flex align-center justify-between mb-40">
        <h1>Функциональность JavaScript</h1>
        <p className="opacity-6">Демонстрация возможностей</p>
      </header>

      {/* LAB: Блок переключения темы */}
      <section className="feature-section theme-section mb-60">
        <div className="section-header">
          <h2 className="mb-20">1. Переключение темы</h2>
          <p className="opacity-6 mb-30">Нажмите кнопку для переключения между светлой и темной темой</p>
        </div>
        
        <div className="theme-demo">
          <div className="theme-card">
            <div className="card-header">
              <h3>Демонстрационная карточка</h3>
            </div>
            <div className="card-content">
              <div className="theme-elements">
                <div className="theme-input-group">
                  <input type="text" placeholder="Пример поля ввода" className="theme-input" />
                </div>
              </div>
            </div>
          </div>
          
          <button 
            className="theme-toggle-button"
            onClick={toggleTheme}
            aria-label={isDarkTheme ? "Переключить на светлую тему" : "Переключить на темную тему"}
          >
            <span className="theme-icon">
              {isDarkTheme ? '☀️' : '🌙'}
            </span>
            {isDarkTheme ? 'Светлая тема' : 'Темная тема'}
          </button>
        </div>
      </section>

      {/* LAB: Форма подписки */}
      <section className="feature-section subscription-section mb-60">
        <div className="section-header">
          <h2 className="mb-20">2. Подписка на новости</h2>
          <p className="opacity-6 mb-30">Подпишитесь на рассылку чтобы быть в курсе новинок</p>
        </div>
        
        <div className="subscription-demo">
          <form onSubmit={handleSubscribe} className="subscription-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email адрес</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="subscription-input"
                required
              />
            </div>
            <button type="submit" className="subscription-button">
              Подписаться
            </button>
          </form>
          
          {subscriptionMessage && (
            <div className="subscription-message">
              {subscriptionMessage}
            </div>
          )}
        </div>
      </section>

      {/* LAB: Cookies уведомление с jQuery */}
      <section className="feature-section cookies-section">
        <div className="section-header">
          <h2 className="mb-20">3. Уведомление о Cookies</h2>
          <p className="opacity-6 mb-30">Демонстрация скрываемого уведомления с использованием jQuery</p>
        </div>
        
        <div className="cookies-demo">
          {/* LAB: Cookies баннер */}
          <div className="cookies-banner" id="cookiesBanner">
            <div className="cookies-content">
              <div className="cookies-text">
                <h4>Использование Cookies</h4>
                <p>Используя данный сайт, вы даете согласие на использование файлов cookies.</p>
              </div>
              <button 
                className="cookies-button"
                id="cookiesAcceptButton"
              >
                Принимаю
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default FeaturesPage;