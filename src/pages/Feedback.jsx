import React from 'react';

function Feedback() {
  const [formData, setFormData] = React.useState({
    username: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Проверка валидности формы
    const form = e.target;
    if (!form.checkValidity()) {
      alert('Пожалуйста, заполните все поля корректно');
      return;
    }

    // В реальном приложении здесь был бы fetch запрос к API
    alert('Сообщение отправлено! (в демо-режиме)');
    
    // Очищаем форму
    setFormData({
      username: '',
      email: '',
      message: ''
    });
  };

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <div className="d-flex align-center">
          <h1 style={{ marginRight: '20px' }}>Связаться с нами</h1>
          <img 
            src="https://cdn.7tv.app/emote/01GJ5JDNF8000DME7NTZSXDMYV/4x.avif" 
            alt="Support GIF"
            style={{
              width: '650px',
              height: '150px',
              borderRadius: '10px'
            }}
          />
        </div>
      </div>

      <div className="feedback-form-container" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <p className="mb-30 opacity-6">
          Если у вас есть вопросы, предложения или вам нужна помощь, заполните форму ниже и мы обязательно свяжемся с вами.
        </p>

        <form onSubmit={handleSubmit} className="feedback-form" noValidate>
          <div className="form-group mb-20">
            <label htmlFor="username" className="d-block mb-10">
              Имя пользователя *
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="field"
              placeholder="Введите ваше имя"
              minLength="2"
              required
            />
            <div className="form-hint">Минимальная длина - 2 символа</div>
          </div>

          <div className="form-group mb-20">
            <label htmlFor="email" className="d-block mb-10">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="field"
              placeholder="example@mail.com"
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
              required
            />
            <div className="form-hint">Введите корректный email адрес</div>
          </div>

          <div className="form-group mb-30">
            <label htmlFor="message" className="d-block mb-10">
              Текст сообщения *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="field"
              placeholder="Опишите ваш вопрос или предложение..."
              rows="6"
              required
              style={{
                resize: 'vertical',
                minHeight: '120px'
              }}
            />
            <div className="form-hint">Опишите вашу проблему или вопрос подробно</div>
          </div>

          {/* lab9 google: изменен класс greenButton → green-button */}
          <button type="submit" className="green-button">
            Отправить сообщение
          </button>
        </form>
      </div>
    </div>
  );
}

export default Feedback;