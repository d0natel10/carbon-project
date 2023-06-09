function Check({onClose, onRemove, items = []}){

    return (
        <div className="overlay">
      <div className="drawer">
        <h2 className="mb-30 d-flex justify-between">Корзина <img onClick={onClose} className= "cu-p" src="/img/btn-rem.svg" alt="close"/></h2>

        {items.length > 0 ?(
          <div className="items">
          {items.map((obj) => (
          <div className="cartItem d-flex align-center mb-25">
            <img className="mr-20" width ={70} height = {70} src= {obj.image} alt="items"/>
            <div className="mr-20">
            <p className = "mb-5">{obj.title}</p>
            <b>{obj.price} руб.</b>
            </div>
            <img onClick= {() => onRemove(obj.id)} className="remove-btn" src= "/img/btn-rem.svg" alt = "remove"/>     
             </div>
             ))}
          <div className="total-block">
          <ul>
            <li className="d-flex">
              <span>Итого:</span>
              <div></div>
              <b>13800 руб.</b>
            </li>
              <li className="d-flex">
              <span>Налог 5%:</span>
              <div></div>
              <b>690 руб.</b>
            </li>
          </ul>
          <button className="just-button">Оформить заказ<img src="/img/arrow.svg" alt="arrow"/></button>
        </div>
        </div>
      </div>
      </div>
    );
}
export default Check;