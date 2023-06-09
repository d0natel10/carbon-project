import React from 'react';


function Registration() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [phoneNum, setPhoneNum] = React.useState('');
    const [name, setName] = React.useState('');
    const [login, setLogin] = React.useState('');
    const [options, setOptions] = React.useState([]);

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
                <div className="login">
                    <input placeholder="Phone Number..." value={phoneNum} onChange={(e) => setPhoneNum(e.target.value)} />
                </div>
                <div className="login">
                    <input placeholder="Name..." value={name} onChange={(e) => setName(e.target.value)} />
                </div>
            </div>
        </div>
    );
}
export default Registration;