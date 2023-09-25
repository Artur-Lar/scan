import React from "react";
import key from "./images/key.png";
import locker from "./images/locker.png";
import "./styles/registration.css";
import LoginRegistrationToggle from "./LoginRegistrationToggle";

export default function registration() {
  return (
    <div>
      <div className="authTxtAndImg">
        <div className="authTextAndImg">
          <div className="autorizText">
            Для оформления подписки на тариф, необходимо авторизоваться.
          </div>
          <div className="authImg">
            <img src={key} alt="key" />
          </div>
        </div>
        <div className="authForms">
          <div>
            <img src={locker} alt="locker" />
          </div>
          <div className="formsBlock">
            <LoginRegistrationToggle />
          </div>
        </div>
      </div>
    </div>
  );
}
