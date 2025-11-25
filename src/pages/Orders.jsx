import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';

function Orders() {
  const [orders, setOrders] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    const savedOrders = localStorage.getItem('react-sneakers-orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  const handleReturnToMain = () => {
    navigate('/');
  };

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои заказы</h1>
      </div>

      <div className="d-flex flex-wrap">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order.id} style={{marginBottom: '20px', width: '100%'}}>
              <h3>Заказ #{order.id} от {order.date}</h3>
              <div className="d-flex flex-wrap">
                {order.items.map((item) => (
                  <Card key={item.id} {...item} />
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="cartEmpty d-flex align-center justify-center flex-column flex">
            <img className="mb-20" width="120px" src="/img/package.png" alt="No orders" />
            <h2>У вас нет заказов</h2>
            <p className="opacity-6">Вы ещё ничего не заказывали</p>
            <button onClick={handleReturnToMain} className="greenButton">
              <img src="/img/arrow.svg" alt="Arrow" />
              Вернуться на главную
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;