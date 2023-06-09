import React from 'react';

import axios from 'axios';

function Registration() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [phoneNum, setPhoneNum] = React.useState('');
    const [name, setName] = React.useState('');
    const [login, setLogin] = React.useState('');
    const [countryCodeId, setCountryCodeId] = React.useState(' ');
    const [options, setOptions] = React.useState([]);

    React.useEffect(() => {
        axios
            .get('https://647f4452c246f166da907515.mockapi.io/item')
            .then((res) => {
                setOptions(
                    res.data.map((item) => ({
                        value: `${item.country} ${item.countryCode}`,
                        label: `(${item.country}) ${item.countryCode}`
                    })).map((option) => option.value)
                );
            })
            .catch((err) => console.log(err));
    }, []);

    const handleOptionChange = (event) => {
        setCountryCodeId(event.target.value);
    };

    const handleLogin1 = (e) => {
        e.preventDefault();
        axios.post('https://647f4452c246f166da907515.mockapi.io/cart', {
            email,
            password,
            name,
            login,
            phoneNum,
            countryCodeId
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
                <h2>Registration</h2>
                <div className="login">
                    <input placeholder="Login..." value={login} onChange={(e) => setLogin(e.target.value)} />
                </div>
                <div className="login">
                    <input placeholder="Password..." value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="login">
                    <input placeholder="Email..." value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="login1" >
                    <select value={countryCodeId} onChange={handleOptionChange}>
                        {options.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>

                </div>
                <div className="login">
                    <input placeholder="Phone Number..." value={phoneNum} onChange={(e) => setPhoneNum(e.target.value)} />
                </div>
                <div className="login">
                    <input placeholder="Name..." value={name} onChange={(e) => setName(e.target.value)} />
                </div>


                <button className="logBtn" onClick={handleLogin1}>

                    Sign up

                </button>



            </div>
        </div>
    );
}
export default Registration;