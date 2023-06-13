
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
import RegistrationData from './components/sign-in-out/RegistrationData';

function App() {
const [cartOpened, setCartOpened] = React.useState(false);
const [userOpened, setUserOpened] = React.useState(false);
const [items, setItems] = React.useState([]);
const [cartItems, setCartItems] = React.useState([]);
const [favorites, setFavorites] = React.useState([]);
const [searchItem, setSearchItem] = React.useState('');
const [user, setUser] = React.useState([]);

React.useEffect(()=>{
  async function fetchData(){
    const CartResponse = await axios.get('https://647f4452c246f166da907515.mockapi.io/cart');
    const FavoritesResponse = await axios.get('https://647f4452c246f166da907515.mockapi.io/cart');
    const ItemsResponse = await axios.get('https://647f4452c246f166da907515.mockapi.io/items');
      setCartItems(CartResponse.data)
      setFavorites(FavoritesResponse.data)
      setItems(ItemsResponse.data)
  }
  fetchData();
}, []);


const onAddToCart = async (obj) => {
  try {
      if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
          axios.delete(`https://647f4452c246f166da907515.mockapi.io/cart${obj.id}`);
          setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
      }
      else {
          axios.post('https://647f4452c246f166da907515.mockapi.io/cart', obj);
          setCartItems((prev) => [...prev, obj]);
      }

  } catch (error) {

      alert('Ошибка добавления в корзин.');

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
      alert('Не было добавлено в избранное');

  }
};

const onChangeSearchInput=(event) =>{
  setSearchItem(event.target.value);
}

const onRemoveItem = (id)=>{
  axios.delete(`https://647f4452c246f166da907515.mockapi.io/cart/${id}`);
  setCartItems((prev) => prev.filter(item => item.id !== id));
}

const userId = localStorage.getItem('userId');

  return (

    <div className="wrapper clear">
    {cartOpened ?<Check items ={cartItems} onClose={() => setCartOpened(false)} onRemove = {onRemoveItem}/> : null}
    {userOpened ? <User cartItems={cartItems} favorites={favorites} onCloseUser={() => setUserOpened(false)} /> : null}
      <Header onClickCart = {() => setCartOpened(true)}
               onClickUser={() => setUserOpened(true)}/>
    <Routes>
      <Route path= "/" element = {<Home
      items ={items}
      cartItems = {cartItems}
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

        <Route path="/registration" element={<Registration
        />}>
        </Route>
          
        <Route path="/registrationData" element={<RegistrationData
        />}>
        </Route>

      </Routes>
    </div>
  );
  
}

export default App;
