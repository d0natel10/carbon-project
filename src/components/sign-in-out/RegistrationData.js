import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";

import OtpInput from "otp-input-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "./firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";

function RegistrationData() {

const [email, setEmail] = useState('');
const [phone, setPhoneNum] = useState('');
const [name, setName] = useState('');

const handleRegistration = (e) => {
e.preventDefault();
axios.post('https://647f4452c246f166da907515.mockapi.io/cart', {
email,
name,
phone
}).then((res) => {
localStorage.setItem('token', res.data.token);
window.location.href = '/login';
}).catch((err) => {
console.error(err);
alert('Registration Error');
});
};

const [otp, setOtp] = useState("");
const [loading, setLoading] = useState(false);
const [showOTP, setShowOTP] = useState(false);
const [user, setUser] = useState(null);

function onCaptchVerify() {
if (!window.recaptchaVerifier) {
window.recaptchaVerifier = new RecaptchaVerifier(
"recaptcha-container",
{
size: "invisible",
callback: (response) => {
onSignup();
},
"expired-callback": () => {},
},
auth
);
}
}

function onSignup() {
setLoading(true);
onCaptchVerify();

const appVerifier = window.recaptchaVerifier;

const formatPh = "+" + phone;

signInWithPhoneNumber(auth, formatPh, appVerifier)
  .then((confirmationResult) => {
    window.confirmationResult = confirmationResult;
    setLoading(false);
    setShowOTP(true);
    toast.success("OTP sended successfully!");
  })
  .catch((error) => {
    console.log(error);
    setLoading(false);
  });
}

function onOTPVerify() {
setLoading(true);
window.confirmationResult
.confirm(otp)
.then(async (res) => {
console.log(res);
setUser(res.user);
setLoading(false);
})
.catch((err) => {
console.log(err);
setLoading(false);
});
}

React.useEffect(() => {
document.querySelector('.overlay').style.display = 'block';
}, []);

return (
<div className="overlay">
<div className="Login">
<div className="regis d-flex justify-between">
<Link to="/registration">
<img className="mr-30 cu-p" src="/img/arrow-reg.svg" alt="reg-arrow" />
</Link>
<h2>Регистрация</h2>
</div>

    <div className="login">
      <input className="opacity-8" placeholder="Имя..." value={name} onChange={(e) => setName(e.target.value)} />
    </div>
    <div className="login">
      <input className="opacity-8" placeholder="E-mail..." value={email} onChange={(e) => setEmail(e.target.value)} />
    </div>
    {showOTP ? (
       <>
       <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
         <BsFillShieldLockFill size={30} />
       </div>
       <label
         htmlFor="otp"
         className="font-bold text-xl text-white text-center"
       >
         Enter your OTP
       </label>
       <OtpInput
         value={otp}
         onChange={setOtp}
         OTPLength={6}
         otpType="number"
         disabled={false}
         autoFocus
         className="opt-container "
       ></OtpInput>
       <button
         onClick={onOTPVerify}
         className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
       >
         {loading && (
           <CgSpinner size={20} className="mt-1 animate-spin" />
         )}
         <span>Verify OTP</span>
       </button>
     </>
    ) : (
      <>
        <div className="login-1">
          <PhoneInput country={"ru"} value={phone} onChange={setPhoneNum} />
          <div className="mt-30"></div>
        </div>
        <button className="logBtn-reg align-center"
        onClick={onSignup}>
          {loading ? (
            <CgSpinner size={20} className="mt-1 animate-spin" />
          ) : (
            <span>Зарегистрироваться</span>
          )}
        </button>
      </>
    )}
  </div>
  <Toaster toastOptions={{ duration: 4000 }} />
  <div id="recaptcha-container"></div>
</div>
);
}

export default RegistrationData;