import {Link} from 'react-router-dom'

function Header(props){
    return(
        <header className = "d-flex justify-between align-center p-40">
       <Link to ="/">
          <div className = "d-flex align-center">
        <img width = {45} height = {45} src = "/img/logo.png" alt = "logo"/>
      <div className = "header-info">
        <h3 className = "text-uppercase">Carbon Evolution</h3>
        <p>магазин автомобильных запчастей</p>
      </div>
        </div>
      </Link>
      <ul className ="d-flex">
        <li onClick ={props.onClickCart} className = "mr-30 cu-p">
          <img width= {18} height = {18} src = "/img/card.svg" alt = "cartItem-icon"/>
          <span>1205 руб.</span>
        </li>
        <li className = "mr-20 cu-p">
          <Link to ="/favorites">
          <img width= {18} height = {18} src = "/img/header-heart.svg" alt = "favorite-icon"/>
          </Link>
        </li>
        <li>
          <Link to ="/login">
          <img width= {18} height = {18} src = "/img/acc.svg" alt = "acc-icon"/>
          </Link>
        </li>
      </ul>
    </header>
    );
}
export default Header;