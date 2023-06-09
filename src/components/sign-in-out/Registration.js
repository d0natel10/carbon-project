
import axios from 'axios';
import React from 'react';


function Registration() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [phoneNum, setPhoneNum] = React.useState('');
    const [name, setName] = React.useState('');
    const [login, setLogin] = React.useState('');
    const [options, setOptions] = React.useState([]);

    
    const handleLogin1 = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5295/User', {
            email,
            password,
            name,
            login,
            phoneNum
        }).then((res) => {
            localStorage.setItem('token', res.data.token);
            window.location.href = '/login';
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
                <h2>Регистрация</h2>
                <div className="login">
                    <input className = "opacity-8" placeholder="Имя..." value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="login">
                    <input className = "opacity-8" placeholder="Логин..." value={login} onChange={(e) => setLogin(e.target.value)} />
                </div>
                <div className="login">
                    <input className = "opacity-8" placeholder="Пароль..." value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="login">
                    <input className = "opacity-8" placeholder="E-mail..." value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="login-1">
                    <input className = "opacity-8" placeholder="Номер телефона..." value={phoneNum} onChange={(e) => setPhoneNum(e.target.value)} />
                    <div className = "mt-30"></div>
                </div>

                <button className="logBtn-reg mt-20 align-center" onClick={handleLogin1}>
                Зарегистрироваться
                </button>
            </div>
        </div>
    );
}
export default Registration;