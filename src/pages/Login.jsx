import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [loginData, setLoginData] = React.useState({
    username: '',
    password: ''
  });
  const [isLoginHovered, setIsLoginHovered] = React.useState(false);
  const [isRegisterHovered, setIsRegisterHovered] = React.useState(false);
  const [focusedField, setFocusedField] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
    // Очищаем ошибку при изменении поля
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField('');
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!loginData.username.trim()) {
      newErrors.username = 'Логин обязателен';
    }
    
    if (!loginData.password) {
      newErrors.password = 'Пароль обязателен';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      alert('Заполните все поля');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Отправляем данные на PHP сервер
      const response = await fetch('http://localhost/api/php/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData)
      });
      
      const result = await response.json();
      
      if (result.success) {
        alert(result.message);
        
        // Сохраняем пользователя в localStorage
        localStorage.setItem('currentUser', JSON.stringify(result.user));
        
        // Очищаем форму
        setLoginData({
          username: '',
          password: ''
        });
        
        // Перенаправляем на главную страницу через 1 секунду
        setTimeout(() => {
          navigate('/');
          window.location.reload(); // Обновляем страницу для обновления состояния авторизации
        }, 1000);
        
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Ошибка входа:', error);
      alert('Ошибка соединения с сервером. Проверьте, запущен ли локальный сервер.');
    } finally {
      setIsLoading(false);
    }
  };

  const getFieldStyle = (fieldName) => ({
    border: `1px solid ${focusedField === fieldName ? '#9dd558' : errors[fieldName] ? '#ff6b6b' : '#f3f3f3'}`,
    borderRadius: '10px',
    padding: '13px',
    fontSize: '16px',
    width: '100%',
    boxSizing: 'border-box',
    outline: 'none',
    transition: 'border-color .1s ease-in-out'
  });

  const getButtonStyle = (isHovered, backgroundColor, disabled = false) => ({
    width: '100%',
    height: '55px',
    background: disabled ? '#bebebe' : (isHovered ? lightenColor(backgroundColor, 5) : backgroundColor),
    borderRadius: '18px',
    border: '0',
    color: '#fff',
    fontSize: '16px',
    fontWeight: '500',
    cursor: disabled ? 'not-allowed' : 'pointer',
    marginTop: 'auto',
    transition: 'background .1s ease-in-out',
    opacity: disabled ? 0.7 : 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px'
  });

  const lightenColor = (color, percent) => {
    // Простая функция для осветления цвета
    if (color === '#9dd558') return '#a8e'; // Более светлый зеленый
    if (color === '#7b68ee') return '#875'; // Более светлый фиолетовый
    return color;
  };

  // Проверяем, есть ли уже авторизованный пользователь
  React.useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      console.log('Пользователь уже авторизован:', JSON.parse(currentUser));
    }
  }, []);

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
              <label htmlFor="username" style={{ display: 'block', marginBottom: '10px', fontWeight: '500' }}>
                Логин *
              </label>
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
                disabled={isLoading}
              />
              {errors.username && <div style={{ color: '#ff6b6b', fontSize: '12px', marginTop: '5px' }}>{errors.username}</div>}
            </div>

            <div style={{ marginBottom: '30px' }}>
              <label htmlFor="password" style={{ display: 'block', marginBottom: '10px', fontWeight: '500' }}>
                Пароль *
              </label>
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
                disabled={isLoading}
              />
              {errors.password && <div style={{ color: '#ff6b6b', fontSize: '12px', marginTop: '5px' }}>{errors.password}</div>}
            </div>

            <button 
              type="submit" 
              style={getButtonStyle(isLoginHovered, '#9dd558', isLoading)}
              onMouseEnter={() => !isLoading && setIsLoginHovered(true)}
              onMouseLeave={() => setIsLoginHovered(false)}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span>Вход...</span>
                  <span>⏳</span>
                </>
              ) : 'Войти'}
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
          <ul style={{ paddingLeft: '20px', marginBottom: '10px', flex: 1 }}>
            <li style={{ marginBottom: '10px' }}>История заказов</li>
            <li style={{ marginBottom: '10px' }}>Избранные товары</li>
            <li style={{ marginBottom: '10px' }}>Специальные предложения</li>
            <li>Быстрое оформление заказов</li>
          </ul>
          
          {/* Информация о текущем пользователе */}
          <div style={{ marginTop: '10px', marginBottom: '20px', padding: '15px', background: '#e7f6ff', borderRadius: '10px' }}>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '14px' }}>Статус авторизации:</h4>
            {(() => {
              const currentUser = localStorage.getItem('currentUser');
              if (currentUser) {
                const user = JSON.parse(currentUser);
                return (
                  <div style={{ fontSize: '12px' }}>
                    <p style={{ margin: '5px 0' }}>Вы авторизованы как:</p>
                    <p style={{ margin: '5px 0', fontWeight: 'bold' }}>
                      {user.firstName} {user.lastName}
                    </p>
                    <p style={{ margin: '5px 0', color: '#666' }}>Логин: {user.login}</p>
                    <button 
                      onClick={() => {
                        localStorage.removeItem('currentUser');
                        alert('Вы вышли из системы');
                        window.location.reload();
                      }}
                      style={{
                        background: '#ff6b6b',
                        color: 'white',
                        border: 'none',
                        padding: '5px 10px',
                        borderRadius: '5px',
                        fontSize: '12px',
                        cursor: 'pointer',
                        marginTop: '5px'
                      }}
                    >
                      Выйти
                    </button>
                  </div>
                );
              }
              return (
                <p style={{ margin: '0', fontSize: '12px', color: '#666' }}>
                  Не авторизован
                </p>
              );
            })()}
          </div>

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