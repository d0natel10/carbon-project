import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Autorization() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get('https://647f4452c246f166da907515.mockapi.io/cart').then((res) => {
            setUsers(res.data);
        }).catch((err) => {
            console.error(err);
            alert('Error fetching users');
        });
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        const authenticatedUser = users.find((u) => u.login === login && u.password === password);
        if (!authenticatedUser) {
            alert('Неверный пароль. Повторите попытку');
            return;
        }
        localStorage.setItem('userId', authenticatedUser.id);
        localStorage.setItem('userLogin', login);
        setUser(authenticatedUser);
        window.location.href = '/';
    };

    useEffect(() => {
        document.querySelector('.overlay').style.display = 'block';
    }, []);

    return (
        <div className="overlay">
            <div className="Login">
                <h2>Авторизация</h2>
            
                <div className="login">
                    <input className = "opacity-8" placeholder="Логин..." value={login} onChange={(e) => setLogin(e.target.value)} />
                </div>
                <div className="login">
                    <input className = "opacity-8" placeholder="Пароль..." value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <Link to="/registration" className="Link">
                    <span className = "opacity-6 mt-10 align-center">Зарегистрироваться...</span>
                </Link>

                <button className="logBtn mt-20" onClick={handleLogin}>
                    Вход
                </button>

            </div>
        </div>
    );
}

export default Autorization;