
import Check from './components/Check';
import Header from './components/Header';
import React from 'react';
import axios from 'axios';
import {Route} from 'react-router-dom';
import {Routes} from 'react-router-dom';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Autorization from './components/sign-in-out/Autorization';
import User from './components/sign-in-out/User';
import Registration from './components/sign-in-out/Registration';


function App() {

const [cartOpened, setCartOpened] = React.useState(false);

const [items, setItems] = React.useState([]);

const [cartItems, setCartItems] = React.useState([]);

const [favorites, setFavorites] = React.useState([]);

const [searchItem, setSearchItem] = React.useState('');

React.useEffect(()=>{
  axios.get('https://647f4452c246f166da907515.mockapi.io/items').then((res) => {
    setItems(res.data)
    });
    axios.get('https://647f4452c246f166da907515.mockapi.io/cart').then((res) => {
    setCartItems(res.data)
  });
  axios.get('https://647f4452c246f166da907515.mockapi.io/cart').then((res) => {
    setFavorites(res.data)
});
}, []);


const onAddToCart = async (obj) => {
  try {
      if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
          axios.delete(`https://647f4452c246f166da907515.mockapi.io/cart${obj.id}`);
          setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
      }
      else {
          const { data } = await axios.post('https://647f4452c246f166da907515.mockapi.io/cart', obj);
          setCartItems((prev) => [...prev, data]);
      }

  } catch (error) {

      alert('Do not add to cart');

  }
}; 
   
const onAddToFavorite = async (obj) => {
  try {
      if (favorites.find((item) => Number(item.id) === Number(obj.id))) {
          axios.delete(`https://647f4452c246f166da907515.mockapi.io/cart/${obj.id}`);
          setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
      }
      else {
          const { data } = await axios.post('https://647f4452c246f166da907515.mockapi.io/cart', obj);
          setFavorites((prev) => [...prev, data]);
      }

  } catch (error) {
      alert('Do not add to favorites');

  }
};

const onChangeSearchInput=(event) =>{
  setSearchItem(event.target.value);
}

const onRemoveItem = (id)=>{
  axios.delete(`https://647f4452c246f166da907515.mockapi.io/cart/${id}`);
  setCartItems((prev) => prev.filter(item => item.id !== id));
}

  return (

    <div className="wrapper clear">
    {cartOpened ?<Check items ={cartItems} onClose={() => setCartOpened(false)} onRemove = {onRemoveItem}/> : null}
      <Header onClickCart = {() => setCartOpened(true)}/>
    <Routes>
      <Route path= "/" element = {<Home
      items ={items}
      setSearchItem = {setSearchItem}
      onChangeSearchInput = {onChangeSearchInput} 
      searchItem = {searchItem}
      onAddToCart = {onAddToCart}
      onAddToFavorite = {onAddToFavorite}
      />}>

      </Route>
      <Route path="/favorites" element = {<Favorites items = {favorites} onAddToFavorite ={onAddToFavorite}/>}>
      </Route>

        <Route path="/login" element = {<Autorization/>}>
        </Route>

        <Route path="/registration" element={<Registration/>}>
        </Route>

      </Routes>
    </div>
  );
  
}

export default App;
