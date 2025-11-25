import React from 'react';
import { useCart } from '../../hooks/useCart';
import styles from './Drawer.module.scss';

// Временная реализация Info прямо в файле
const Info = ({ title, image, description, onClose }) => {
  return (
    // lab9 google: изменен класс cartEmpty → cart-empty
    <div className="cart-empty d-flex align-center justify-center flex-column flex">
      <img className="mb-20" width="120px" src={image} alt="Empty" />
      <h2>{title}</h2>
      <p className="opacity-6">{description}</p>
      {/* lab9 google: изменен класс greenButton → green-button */}
      <button onClick={onClose} className="green-button">
        <img src="/img/arrow.svg" alt="Arrow" />
        Вернуться назад
      </button>
    </div>
  );
};

function Drawer({ onClose, onRemove, items = [], opened }) {
  const { cartItems, totalPrice } = useCart();
  const [orderId, setOrderId] = React.useState(null);
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  // Блокируем скролл основного контента при открытой корзине
  React.useEffect(() => {
    if (opened) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [opened]);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      
      // Создаем заказ
      const newOrder = {
        id: Date.now(),
        items: cartItems,
        date: new Date().toLocaleString(),
        total: totalPrice
      };
      
      // Сохраняем заказ в localStorage
      const savedOrders = localStorage.getItem('react-sneakers-orders');
      const orders = savedOrders ? JSON.parse(savedOrders) : [];
      orders.push(newOrder);
      localStorage.setItem('react-sneakers-orders', JSON.stringify(orders));
      
      // Очищаем корзину в localStorage
      localStorage.removeItem('react-sneakers-cart');
      
      setOrderId(newOrder.id);
      setIsOrderComplete(true);
      
      // Очищаем корзину в состоянии приложения
      // Это вызовет onRemove для всех товаров в корзине
      cartItems.forEach(item => {
        onRemove(item.id);
      });
      
    } catch (error) {
      alert('Ошибка при создании заказа :(');
      console.error(error);
    }
    setIsLoading(false);
  };

  // Обработчик клика по overlay
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}
      onClick={handleOverlayClick}
    >
      <div className={styles.drawer}>
        <h2 className="d-flex justify-between mb-30">
          Корзина <img onClick={onClose} className="cu-p" src="/img/btn-remove.svg" alt="Close" />
        </h2>

        {items.length > 0 && !isOrderComplete ? (
          <div className="d-flex flex-column flex">
            <div className={styles.items}>
              {items.map((obj) => (
                // lab9 google: изменен класс cartItem → cart-item
                <div key={obj.id} className="cart-item d-flex align-center mb-20">
                  {/* lab9 google: изменен класс cartItemImg → cart-item-img */}
                  <div
                    style={{ backgroundImage: `url(${obj.imageUrl})` }}
                    className="cart-item-img"></div>

                  <div className="mr-20 flex">
                    <p className="mb-5">{obj.title}</p>
                    <b>{obj.price} руб.</b>
                  </div>
                  {/* lab9 google: изменен класс removeBtn → remove-btn */}
                  <img
                    onClick={() => onRemove(obj.id)}
                    className="remove-btn"
                    src="/img/btn-remove.svg"
                    alt="Remove"
                  />
                </div>
              ))}
            </div>
            {/* lab9 google: изменен класс cartTotalBlock → cart-total-block */}
            <div className="cart-total-block">
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>{totalPrice} руб. </b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>{Math.round(totalPrice * 0.05)} руб. </b>
                </li>
              </ul>
              {/* lab9 google: изменен класс greenButton → green-button */}
              <button disabled={isLoading} onClick={onClickOrder} className="green-button">
                Оформить заказ <img src="/img/arrow.svg" alt="Arrow" />
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={isOrderComplete ? 'Заказ оформлен!' : 'Корзина пустая'}
            description={
              isOrderComplete
                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
            }
            image={isOrderComplete ? '/img/complete-order.jpg' : '/img/empty-cart.jpg'}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  );
}

export default Drawer;