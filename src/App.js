import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Drawer from './components/Drawer';
import AppContext from './context';

import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';
import Registration from './pages/Registration';
import Login from './pages/Login'; 
import FeaturesPage from './pages/FeaturesPage';
import Feedback from './pages/Feedback';
import IconsPage from './pages/IconsPage';


function App() {
  const [items, setItems] = React.useState([
    {
      id: 1,
      title: "Мужские Кроссовки Nike Blazer Mid Suede",
      price: 12999,
      imageUrl: "/img/sneakers/1.jpg"
    },
    {
      id: 2,
      title: "Мужские Кроссовки Nike Air Max 270",
      price: 15600,
      imageUrl: "/img/sneakers/2.jpg"
    },
    {
      id: 3,
      title: "Мужские Кроссовки Nike Air Force 1",
      price: 11999,
      imageUrl: "/img/sneakers/3.jpg"
    },
    {
      id: 4,
      title: "Мужские Кроссовки Nike Dunk Low Retro",
      price: 13999,
      imageUrl: "/img/sneakers/4.jpg"
    },
    {
      id: 5,
      title: "Мужские Кроссовки Adidas Ultraboost 21",
      price: 14999,
      imageUrl: "/img/sneakers/5.jpg"
    },
    {
      id: 6,
      title: "Мужские Кроссовки Adidas NMD_R1",
      price: 12999,
      imageUrl: "/img/sneakers/6.jpg"
    },
    {
      id: 7,
      title: "Мужские Кроссовки Puma RS-X",
      price: 8999,
      imageUrl: "/img/sneakers/7.jpg"
    },
    {
      id: 8,
      title: "Мужские Кроссовки New Balance 574",
      price: 10999,
      imageUrl: "/img/sneakers/8.jpg"
    },
    {
      id: 9,
      title: "Мужские Кроссовки Reebok Classic Leather",
      price: 7999,
      imageUrl: "/img/sneakers/9.jpg"
    },
    {
      id: 10,
      title: "Мужские Кроссовки Vans Old Skool",
      price: 6999,
      imageUrl: "/img/sneakers/10.jpg"
    }
  ]);
  
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);

  // Загрузка данных из localStorage при монтировании
  React.useEffect(() => {
    console.log('=== LOADING FROM LOCALSTORAGE ===');
    
    const savedCart = localStorage.getItem('react-sneakers-cart');
    const savedFavorites = localStorage.getItem('react-sneakers-favorites');
    
    console.log('Saved cart:', savedCart);
    console.log('Saved favorites:', savedFavorites);
    
    if (savedCart && savedCart !== '[]') {
      try {
        const parsedCart = JSON.parse(savedCart);
        console.log('Parsed cart:', parsedCart);
        setCartItems(parsedCart);
      } catch (error) {
        console.error('Error parsing cart:', error);
        localStorage.removeItem('react-sneakers-cart');
      }
    }
    
    if (savedFavorites && savedFavorites !== '[]') {
      try {
        const parsedFavorites = JSON.parse(savedFavorites);
        console.log('Parsed favorites:', parsedFavorites);
        setFavorites(parsedFavorites);
      } catch (error) {
        console.error('Error parsing favorites:', error);
        localStorage.removeItem('react-sneakers-favorites');
      }
    }
  }, []);

  // Сохранение корзины в localStorage при изменении
  React.useEffect(() => {
    console.log('=== SAVING CART ===', cartItems);
    localStorage.setItem('react-sneakers-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Сохранение избранного в localStorage при изменении
  React.useEffect(() => {
    console.log('=== SAVING FAVORITES ===', favorites);
    localStorage.setItem('react-sneakers-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const onAddToCart = (obj) => {
    console.log('Adding to cart:', obj);
    const findItem = cartItems.find((item) => Number(item.id) === Number(obj.id));
    if (findItem) {
      const newCartItems = cartItems.filter((item) => Number(item.id) !== Number(obj.id));
      setCartItems(newCartItems);
    } else {
      const newCartItems = [...cartItems, obj];
      setCartItems(newCartItems);
    }
  };

  const onRemoveItem = (id) => {
    console.log('Removing from cart:', id);
    const newCartItems = cartItems.filter((item) => Number(item.id) !== Number(id));
    setCartItems(newCartItems);
  };

  const onAddToFavorite = (obj) => {
    console.log('Toggling favorite:', obj);
    if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
      const newFavorites = favorites.filter((item) => Number(item.id) !== Number(obj.id));
      setFavorites(newFavorites);
    } else {
      const newFavorites = [...favorites, obj];
      setFavorites(newFavorites);
    }
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id));
  };

  console.log('=== CURRENT STATE ===');
  console.log('Cart items:', cartItems);
  console.log('Favorites:', favorites);

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
        onAddToFavorite,
        onAddToCart,
        setCartOpened,
        setCartItems,
      }}>
      <div className="wrapper clear">
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
          opened={cartOpened}
        />

        <Header onClickCart={() => setCartOpened(true)} />

        <Routes>
          <Route 
            path="/" 
            element={
              <Home
                items={items}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onAddToFavorite={onAddToFavorite}
                onAddToCart={onAddToCart}
              />
            } 
          />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/profile" element={<Login />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/icons" element={<IconsPage />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;