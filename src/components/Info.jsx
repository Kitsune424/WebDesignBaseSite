import React from 'react';
import AppContext from '../context';

const Info = ({ title, image, description }) => {
  const { setCartOpened } = React.useContext(AppContext);

  return (
    // lab9 google: изменен класс cartEmpty → cart-empty
    <div className="cart-empty d-flex align-center justify-center flex-column flex">
      <img className="mb-20" width="120px" src={image} alt="Empty" />
      <h2>{title}</h2>
      <p className="opacity-6">{description}</p>
      {/* lab9 google: изменен класс greenButton → green-button */}
      <button onClick={() => setCartOpened(false)} className="green-button">
        <img src="img/arrow.svg" alt="Arrow" />
        Вернуться назад
      </button>
    </div>
  );
};

export default Info;