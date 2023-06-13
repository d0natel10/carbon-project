
import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Registration() {
 
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState('');

  const handleRegistration = (e) => {
    e.preventDefault();
    axios.post('https://647f4452c246f166da907515.mockapi.io/cart', {
        password,
        login
    }).then((res) => {
        localStorage.setItem('token', res.data.token);
        window.location.href = '/registrationData';
    }).catch((err) => {
        console.error(err);
        alert('Registration Error');
    });
};


React.useEffect(() => {
    document.querySelector('.overlay').style.display = 'block';
}, []);

  return (
    <div className="overlay">
      <div className="Login">
        <div className="regis d-flex justify-between">
          <Link to="/login">
            <img className="mr-30 cu-p" src="/img/arrow-reg.svg" alt="reg-arrow" />
          </Link>
          <h2>Регистрация</h2>
        </div>
  
        <div className="login">
          <input className="opacity-8" placeholder="Логин..." value={login} onChange={(e) => setLogin(e.target.value)} />
        </div>
        <div className="login-1">
          <input
            className="opacity-8"
            placeholder="Пароль..."
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="logBtn-reg mt-20 align-center" onClick={handleRegistration}>
            Продолжить...
        </button>
      </div>
    </div>
  );
}

export default Registration;