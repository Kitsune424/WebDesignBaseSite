import React from 'react';
import { useCart } from '../../hooks/useCart';
import styles from './Drawer.module.scss';

// Временная реализация Info прямо в файле
const Info = ({ title, image, description, onClose }) => {
  return (
    <div className="cartEmpty d-flex align-center justify-center flex-column flex">
      <img className="mb-20" width="120px" src={image} alt="Empty" />
      <h2>{title}</h2>
      <p className="opacity-6">{description}</p>
      <button onClick={onClose} className="greenButton">
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

  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
      <div className={styles.drawer}>
        <h2 className="d-flex justify-between mb-30">
          Корзина <img onClick={onClose} className="cu-p" src="/img/btn-remove.svg" alt="Close" />
        </h2>

        {items.length > 0 && !isOrderComplete ? (
          <div className="d-flex flex-column flex">
            <div className="items flex">
              {items.map((obj) => (
                <div key={obj.id} className="cartItem d-flex align-center mb-20">
                  <div
                    style={{ backgroundImage: `url(${obj.imageUrl})` }}
                    className="cartItemImg"></div>

                  <div className="mr-20 flex">
                    <p className="mb-5">{obj.title}</p>
                    <b>{obj.price} руб.</b>
                  </div>
                  <img
                    onClick={() => onRemove(obj.id)}
                    className="removeBtn"
                    src="/img/btn-remove.svg"
                    alt="Remove"
                  />
                </div>
              ))}
            </div>
            <div className="cartTotalBlock">
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
              <button disabled={isLoading} onClick={onClickOrder} className="greenButton">
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