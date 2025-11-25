import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

function Header(props) {
  const { totalPrice } = useCart();

  return (
    <header className="d-flex justify-between align-center p-40">
      <Link to="/">
        <div className="d-flex align-center">
          <img width={40} height={40} src="/img/logo.png" alt="Logotype" />
          <div>
            <h3 className="text-uppercase">React Sneakers</h3>
            <p className="opacity-5">Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>
      <ul className="d-flex">
        <li className="mr-20 cu-p">
          <Link to="/icons" aria-label="Библиотека иконок">
            <img width={18} height={18} src="/img/grid.svg" alt="Иконки" />
          </Link>
        </li>
        <li onClick={props.onClickCart} className="mr-30 cu-p">
          <img width={18} height={18} src="/img/cart.svg" alt="Корзина" />
          <span>{totalPrice} руб.</span>
        </li>
        <li className="mr-20 cu-p">
          <Link to="/favorites">
            <img width={18} height={18} src="/img/heart.svg" alt="Закладки" />
          </Link>
        </li>
        <li className="mr-20 cu-p">
          <Link to="/profile">
            <img width={18} height={18} src="/img/user.svg" alt="Профиль" />
          </Link>
        </li>
        <li className="mr-20 cu-p">
          <Link to="/orders">
            <img width={18} height={18} src="/img/package.svg" alt="Заказы" />
          </Link>
        </li>
        <li className="mr-20 cu-p">
          <Link to="/features" aria-label="Функциональность">
            <img width={18} height={18} src="/img/code.svg" alt="Функции" />
          </Link>
        </li>
        <li className="mr-20 cu-p">
          <Link to="/feedback">
            <img width={18} height={18} src="/img/chat.svg" alt="Обратная связь" />
          </Link>
        </li>

      </ul>
    </header>
  );
}

export default Header;