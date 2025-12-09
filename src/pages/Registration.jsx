import React from 'react';
import AppContext from '../context';

function Registration() {
  const { setCartOpened } = React.useContext(AppContext);
  const [formData, setFormData] = React.useState({
    lastName: '',      // Фамилия
    firstName: '',     // Имя
    middleName: '',    // Отчество
    login: '',
    password: '',
    email: '',
    gender: '',
    age: ''
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const [errors, setErrors] = React.useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Очищаем ошибку при изменении поля
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Фамилия обязательна';
    } else if (formData.lastName.length > 50) {
      newErrors.lastName = 'Максимум 50 символов';
    }
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Имя обязательно';
    } else if (formData.firstName.length > 50) {
      newErrors.firstName = 'Максимум 50 символов';
    }
    
    if (formData.middleName && formData.middleName.length > 50) {
      newErrors.middleName = 'Максимум 50 символов';
    }
    
    if (!formData.login.trim()) {
      newErrors.login = 'Логин обязателен';
    } else if (formData.login.length > 30) {
      newErrors.login = 'Максимум 30 символов';
    }
    
    if (!formData.password) {
      newErrors.password = 'Пароль обязателен';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Минимум 6 символов';
    } else if (formData.password.length > 30) {
      newErrors.password = 'Максимум 30 символов';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email обязателен';
    } else if (formData.email.length > 100) {
      newErrors.email = 'Максимум 100 символов';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Некорректный email адрес';
    }
    
    if (!formData.gender) {
      newErrors.gender = 'Выберите пол';
    }
    
    if (!formData.age) {
      newErrors.age = 'Возраст обязателен';
    } else {
      const ageNum = parseInt(formData.age);
      if (isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
        newErrors.age = 'Введите возраст от 1 до 120';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      alert('Исправьте ошибки в форме');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Отправляем данные на PHP сервер
      const response = await fetch('http://localhost/api/php/register.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();
      
      if (result.success) {
        alert(result.message);
        // Очищаем форму
        setFormData({
          lastName: '',
          firstName: '',
          middleName: '',
          login: '',
          password: '',
          email: '',
          gender: '',
          age: ''
        });
        
        // Сохраняем пользователя в localStorage для автоматического входа
        if (result.userId) {
          const userData = {
            id: result.userId,
            login: formData.login,
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email
          };
          localStorage.setItem('currentUser', JSON.stringify(userData));
          
          // Перенаправляем на главную страницу через 1 секунду
          setTimeout(() => {
            window.location.href = '/';
          }, 1000);
        }
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Ошибка регистрации:', error);
      alert('Ошибка соединения с сервером. Проверьте, запущен ли локальный сервер.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Регистрация</h1>
      </div>

      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-group mb-20">
          <label htmlFor="lastName" className="d-block mb-10">
            Фамилия <span style={{ color: 'red' }}>*</span>
            <small className="opacity-6" style={{ marginLeft: '10px', fontSize: '12px' }}>
              Макс. 50 символов
            </small>
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={`field ${errors.lastName ? 'error' : ''}`}
            placeholder="Введите вашу фамилию"
            maxLength="50"
            required
          />
          {errors.lastName && <div className="error-text" style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{errors.lastName}</div>}
        </div>

        <div className="form-group mb-20">
          <label htmlFor="firstName" className="d-block mb-10">
            Имя <span style={{ color: 'red' }}>*</span>
            <small className="opacity-6" style={{ marginLeft: '10px', fontSize: '12px' }}>
              Макс. 50 символов
            </small>
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={`field ${errors.firstName ? 'error' : ''}`}
            placeholder="Введите ваше имя"
            maxLength="50"
            required
          />
          {errors.firstName && <div className="error-text" style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{errors.firstName}</div>}
        </div>

        <div className="form-group mb-20">
          <label htmlFor="middleName" className="d-block mb-10">
            Отчество
            <small className="opacity-6" style={{ marginLeft: '10px', fontSize: '12px' }}>
              Макс. 50 символов (необязательно)
            </small>
          </label>
          <input
            type="text"
            id="middleName"
            name="middleName"
            value={formData.middleName}
            onChange={handleChange}
            className={`field ${errors.middleName ? 'error' : ''}`}
            placeholder="Введите ваше отчество"
            maxLength="50"
          />
          {errors.middleName && <div className="error-text" style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{errors.middleName}</div>}
        </div>

        <div className="form-group mb-20">
          <label htmlFor="login" className="d-block mb-10">
            Логин <span style={{ color: 'red' }}>*</span>
            <small className="opacity-6" style={{ marginLeft: '10px', fontSize: '12px' }}>
              Макс. 30 символов
            </small>
          </label>
          <input
            type="text"
            id="login"
            name="login"
            value={formData.login}
            onChange={handleChange}
            className={`field ${errors.login ? 'error' : ''}`}
            placeholder="Придумайте логин"
            maxLength="30"
            required
          />
          {errors.login && <div className="error-text" style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{errors.login}</div>}
        </div>

        <div className="form-group mb-20">
          <label htmlFor="password" className="d-block mb-10">
            Пароль <span style={{ color: 'red' }}>*</span>
            <small className="opacity-6" style={{ marginLeft: '10px', fontSize: '12px' }}>
              6-30 символов
            </small>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`field ${errors.password ? 'error' : ''}`}
            placeholder="Придумайте пароль"
            minLength="6"
            maxLength="30"
            required
          />
          {errors.password && <div className="error-text" style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{errors.password}</div>}
        </div>

        <div className="form-group mb-20">
          <label htmlFor="email" className="d-block mb-10">
            Email <span style={{ color: 'red' }}>*</span>
            <small className="opacity-6" style={{ marginLeft: '10px', fontSize: '12px' }}>
              Макс. 100 символов
            </small>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`field ${errors.email ? 'error' : ''}`}
            placeholder="example@domain.com"
            maxLength="100"
            pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}"
            title="Введите корректный email адрес (например: user@example.com)"
            required
          />
          {errors.email && <div className="error-text" style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{errors.email}</div>}
          <div className="form-hint" style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
            • Максимальная длина: 100 символов<br/>
            • Должен содержать @ и домен
          </div>
        </div>

        <div className="form-group mb-20">
          <label className="d-block mb-10">
            Пол <span style={{ color: 'red' }}>*</span>
          </label>
          <div className="d-flex">
            <label className="mr-20">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === 'male'}
                onChange={handleChange}
                className="mr-10"
                required
              />
              Мужской
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === 'female'}
                onChange={handleChange}
                className="mr-10"
                required
              />
              Женский
            </label>
          </div>
          {errors.gender && <div className="error-text" style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{errors.gender}</div>}
        </div>

        <div className="form-group mb-30">
          <label htmlFor="age" className="d-block mb-10">
            Возраст <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className={`field ${errors.age ? 'error' : ''}`}
            placeholder="Введите ваш возраст"
            min="1"
            max="120"
            required
          />
          {errors.age && <div className="error-text" style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{errors.age}</div>}
        </div>

        <button 
          type="submit" 
          className="green-button" 
          disabled={isLoading}
          style={{ opacity: isLoading ? 0.7 : 1 }}
        >
          {isLoading ? (
            <>
              <span>Регистрация...</span>
              <span style={{ marginLeft: '10px' }}>⏳</span>
            </>
          ) : 'Зарегистрироваться'}
        </button>
      </form>
    </div>
  );
}

export default Registration;