import React from 'react';
import Card from '../components/Card';

function Orders() {
  const [orders, setOrders] = React.useState([]);

  React.useEffect(() => {
    const savedOrders = localStorage.getItem('react-sneakers-orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  return (
    <main className="content p-40">
      <header className="d-flex align-center justify-between mb-40">
        <h1>Мои заказы</h1>
        {orders.length > 0 && (
          <nav aria-label="Статистика заказов">
            <small className="opacity-6">
              Всего заказов: <mark><strong>{orders.length}</strong></mark>
            </small>
          </nav>
        )}
      </header>

      <section aria-labelledby="orders-heading">
        <h2 id="orders-heading" className="visually-hidden">История заказов</h2>

        {orders.length > 0 ? (
          <article className="orders-list">
            {orders.map((order) => (
              <section key={order.id} className="order-card mb-40" style={{
                border: '1px solid #f3f3f3',
                borderRadius: '20px',
                padding: '30px'
              }}>
                <header className="order-header mb-20">
                  <h3>Заказ <strong>#{order.id}</strong> от <time>{order.date}</time></h3>
                  <p className="opacity-6">
                    Сумма заказа: <mark><strong>{order.total} руб.</strong></mark>
                  </p>
                </header>
                
                <div className="d-flex flex-wrap">
                  {order.items.map((item) => (
                    <Card key={item.id} {...item} />
                  ))}
                </div>

                <footer className="order-footer mt-20 pt-20" style={{
                  borderTop: '1px solid #f3f3f3'
                }}>
                  <small className="opacity-6">
                    Статус: <em>Доставка ожидается</em>
                  </small>
                </footer>
              </section>
            ))}
          </article>
        ) : (
          <article className="empty-orders text-center">
            <img width={120} height={120} src="/img/package.png" alt="Нет заказов" />
            <h2>У вас нет заказов</h2>
            <p className="opacity-6 mb-20">
              Вы ещё ничего не заказывали. <em>Начните покупки прямо сейчас!</em>
            </p>
            
            <aside className="shopping-benefits" style={{
              background: '#f8f9fa',
              borderRadius: '15px',
              padding: '20px',
              maxWidth: '400px',
              margin: '0 auto'
            }}>
              <h3>🚀 <mark>Преимущества покупок:</mark></h3>
              <ul style={{ textAlign: 'left' }}>
                <li><small><strong>Быстрая доставка</strong> — 1-2 дня</small></li>
                <li><small><strong>Гарантия качества</strong> — 30 дней</small></li>
                <li><small><strong>Возврат</strong> — без вопросов</small></li>
              </ul>
            </aside>
          </article>
        )}
      </section>
    </main>
  );
}

export default Orders;