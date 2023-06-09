import Card from '../components/Card';

function Home({items, setSearchItem, onChangeSearchInput, searchItem, onAddToCart, onAddToFavorite, cartItems}){

    return (
        <div className = "content p-40"> 
    <div className = "d-flex align-center mr-40 justify-between">
      <h1>{searchItem ? `Поиск по запросу: "${searchItem}"` : 'Все товары'}</h1>
      <div className="Search">
        <div className ="Around-del cu-p">
        {searchItem && <img onClick = {() => setSearchItem('')} src= "/img/del-search.svg" alt = "del"/>} 
        </div>  
        <img src="/img/lupa.svg" alt="Search"/>
        <input onChange = {onChangeSearchInput} value = {searchItem} placeholder= "Поиск..."/> 
      </div>
    </div>
      <div className = "d-flex">
      {items.filter((item, index) => item.title.toLowerCase().includes(searchItem.toLowerCase())).map((item, index) => (
      <Card
      key = {index} 
      onPlus = {(obj) =>onAddToCart(obj)}
      onFavorite = {(obj) =>onAddToFavorite(obj)}
      added = {cartItems.some(obj => Number(obj.id) === Number(item.id))}
      {...item}
      />))}
      </div>
    </div>
    );
}

export default Home;