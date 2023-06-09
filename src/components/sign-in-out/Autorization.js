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
            alert('Incorrect username or password');
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
                <h2>Authorization</h2>
                <Link to="/registration" className="Link">
                    <span>Want to register?</span>
                </Link>
                <div className="login">
                    <input placeholder="Login..." value={login} onChange={(e) => setLogin(e.target.value)} />
                </div>
                <div className="login">
                    <input placeholder="Password..." value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <button className="logBtn" onClick={handleLogin}>
                    Log in
                </button>

            </div>
        </div>
    );
}

export default Autorization;