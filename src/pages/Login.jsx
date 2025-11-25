import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [loginData, setLoginData] = React.useState({
    username: '',
    password: ''
  });
  const [isLoginHovered, setIsLoginHovered] = React.useState(false);
  const [isRegisterHovered, setIsRegisterHovered] = React.useState(false);
  const [focusedField, setFocusedField] = React.useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!loginData.username || !loginData.password) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    alert('Вход выполнен!');
    setLoginData({
      username: '',
      password: ''
    });
  };

  const getFieldStyle = (fieldName) => ({
    border: `1px solid ${focusedField === fieldName ? '#9dd558' : '#f3f3f3'}`,
    borderRadius: '10px',
    padding: '13px',
    fontSize: '16px',
    width: '100%',
    boxSizing: 'border-box',
    outline: 'none',
    transition: 'border-color .1s ease-in-out'
  });

  const getButtonStyle = (isHovered, backgroundColor) => ({
    width: '100%',
    height: '55px',
    background: isHovered ? lightenColor(backgroundColor, 5) : backgroundColor,
    borderRadius: '18px',
    border: '0',
    color: '#fff',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    marginTop: 'auto',
    transition: 'background .1s ease-in-out'
  });

  const lightenColor = (color, percent) => {
    // Простая функция для осветления цвета
    if (color === '#9dd558') return '#a8e';
    if (color === '#7b68ee') return '#875';
    return color;
  };

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Вход в аккаунт</h1>
      </div>

      <div className="d-flex" style={{ gap: '40px', alignItems: 'stretch' }}>
        {/* Форма входа */}
        <div className="login-form" style={{ 
          flex: 1, 
          border: '1px solid #f3f3f3', 
          borderRadius: '20px', 
          padding: '30px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <h2 style={{ margin: '0 0 30px 0', fontSize: '22px' }}>Войти</h2>
          <form onSubmit={handleSubmit} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="username" style={{ display: 'block', marginBottom: '10px', fontWeight: '500' }}>Логин *</label>
              <input
                type="text"
                id="username"
                name="username"
                value={loginData.username}
                onChange={handleChange}
                onFocus={() => handleFocus('username')}
                onBlur={handleBlur}
                style={getFieldStyle('username')}
                placeholder="Введите ваш логин"
                required
              />
            </div>

            <div style={{ marginBottom: '30px' }}>
              <label htmlFor="password" style={{ display: 'block', marginBottom: '10px', fontWeight: '500' }}>Пароль *</label>
              <input
                type="password"
                id="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                onFocus={() => handleFocus('password')}
                onBlur={handleBlur}
                style={getFieldStyle('password')}
                placeholder="Введите ваш пароль"
                required
              />
            </div>

            <button 
              type="submit" 
              style={getButtonStyle(isLoginHovered, '#9dd558')}
              onMouseEnter={() => setIsLoginHovered(true)}
              onMouseLeave={() => setIsLoginHovered(false)}
            >
              Войти
            </button>
          </form>
        </div>

        {/* Блок регистрации */}
        <div className="registration-promo" style={{ 
          flex: 1, 
          border: '1px solid #f3f3f3', 
          borderRadius: '20px', 
          padding: '30px',
          backgroundColor: '#f8f9fa',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <h2 style={{ margin: '0 0 30px 0', fontSize: '22px' }}>Нет аккаунта?</h2>
          <p style={{ marginBottom: '20px', opacity: '.6' }}>
            Зарегистрируйтесь, чтобы получить доступ ко всем функциям магазина:
          </p>
          <ul style={{ paddingLeft: '20px', marginBottom: '30px', flex: 1 }}>
            <li style={{ marginBottom: '10px' }}>История заказов</li>
            <li style={{ marginBottom: '10px' }}>Избранные товары</li>
            <li style={{ marginBottom: '10px' }}>Специальные предложения</li>
            <li>Быстрое оформление заказов</li>
          </ul>
          <Link to="/registration" style={{ textDecoration: 'none' }}>
            <button 
              style={getButtonStyle(isRegisterHovered, '#7b68ee')}
              onMouseEnter={() => setIsRegisterHovered(true)}
              onMouseLeave={() => setIsRegisterHovered(false)}
            >
              Зарегистрироваться
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;