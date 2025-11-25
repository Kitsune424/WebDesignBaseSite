import React from 'react';
import AppContext from '../context';

function Registration() {
  const { setCartOpened } = React.useContext(AppContext);
  const [formData, setFormData] = React.useState({
    fullName: '',
    login: '',
    password: '',
    email: '',
    gender: '',
    age: ''
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
    
    // Проверка заполнения всех полей
    const isFormValid = Object.values(formData).every(value => value.trim() !== '');
    
    if (!isFormValid) {
      alert('Пожалуйста, заполните все поля формы');
      return;
    }

    // Сохраняем данные пользователя в localStorage
    const userData = {
      ...formData,
      registrationDate: new Date().toLocaleString()
    };
    
    localStorage.setItem('react-sneakers-user', JSON.stringify(userData));
    alert('Регистрация успешно завершена!');
    
    // Очищаем форму
    setFormData({
      fullName: '',
      login: '',
      password: '',
      email: '',
      gender: '',
      age: ''
    });
  };

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Регистрация</h1>
      </div>

      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-group mb-20">
          <label htmlFor="fullName" className="d-block mb-10">ФИО *</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="field"
            placeholder="Введите ваше полное имя"
            required
          />
        </div>

        <div className="form-group mb-20">
          <label htmlFor="login" className="d-block mb-10">Логин *</label>
          <input
            type="text"
            id="login"
            name="login"
            value={formData.login}
            onChange={handleChange}
            className="field"
            placeholder="Придумайте логин"
            required
          />
        </div>

        <div className="form-group mb-20">
          <label htmlFor="password" className="d-block mb-10">Пароль *</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="field"
            placeholder="Придумайте пароль"
            required
          />
        </div>

        <div className="form-group mb-20">
          <label htmlFor="email" className="d-block mb-10">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="field"
            placeholder="Введите ваш email"
            required
          />
        </div>

        <div className="form-group mb-20">
          <label className="d-block mb-10">Пол *</label>
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
        </div>

        <div className="form-group mb-30">
          <label htmlFor="age" className="d-block mb-10">Возраст *</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="field"
            placeholder="Введите ваш возраст"
            min="1"
            max="120"
            required
          />
        </div>

        <button type="submit" className="greenButton">
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
}

export default Registration;