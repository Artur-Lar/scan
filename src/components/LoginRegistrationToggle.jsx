import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./styles/LoginRegistrToggle.css";
import google from "./images/google.png";
import facebook from "./images/facebook.png";
import yandex from "./images/yandex.png";

const LoginRegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [accessToken, setAccessToken] = useState(""); // Состояние для хранения токена

  const onSubmit = async (data) => {
    const apiUrl = "https://gateway.scan-interfax.ru/api/v1/account/login";
    const loginData = {
      login: data.username,
      password: data.password,
    };

    try {
      console.log("Отправка запроса:", loginData);

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      console.log("Получен ответ:", response);

      if (!response.ok) {
        throw new Error("Ошибка при авторизации");
      }

      const responseData = await response.json();
      const token = responseData.accessToken;
      const expireDate = responseData.expire;

      setAccessToken(token); // Сохранение токена в состоянии

      localStorage.setItem("accessToken", token);
      localStorage.setItem("expireDate", expireDate);

      console.log("Успешная авторизация!");
      console.log("Токен:", token);
      console.log("Срок действия токена:", expireDate);

      // Перенаправление на следующую страницу. Сделать через ХУКИ
      window.location.href = "./searchPage";

      // Пример использования функции saveToken с accessToken и formData
      const formData = { example: "data" };
      saveToken(accessToken, formData);
    } catch (error) {
      console.error("Ошибка при авторизации:", error.message);
    }
  };

  // Функция для отправки запроса с токеном
  const saveToken = (token, formData) => {
    const apiUrlWithToken =
      "https://gateway.scan-interfax.ru/api/v1/account/login";
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Добавление токена в заголовки
      },
      body: JSON.stringify(formData),
    };

    // Продолжение выполнения запроса с добавленным токеном
    fetch(apiUrlWithToken, requestOptions)
      .then((response) => response.json())
      .then((data) => {})
      .catch((error) => {
        console.error("Ошибка при выполнении запроса с токеном:", error);
      });
  };

  return (
    <div className="formsField">
      <div className="twoBtns">
        <button className="btns-Login">Вход</button>
        <button className="btns-Login">Регистрация</button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} method="POST">
        <label className="loginPass">
          Логин или номер телефона:
          <input
            id="username"
            name="username"
            required
            className="input-registr"
            type="text"
            {...register("username")}
          />
          {errors.username && (
            <p style={{ color: "red" }}>{errors.username.message}</p>
          )}
        </label>
        <br />
        <label className="loginPass">
          Пароль:
          <input
            className="input-registr"
            type="password"
            id="password"
            name="password"
            required
            {...register("password")}
          />
          {errors.password && (
            <p style={{ color: "red" }}>{errors.password.message}</p>
          )}
        </label>
        <br />
        <button className="btnSubmit" type="submit">
          Войти
        </button>
      </form>
      <a className="a" href="*">
        Восстановить пароль
      </a>
      <p className="enterWith">Войти через:</p>
      <div className="btns-enter">
        <a href="www.google.com" className="a">
          <img src={google} alt="google" />
        </a>
        <a href="www.facebook.com" className="a">
          <img src={facebook} alt="facebook" />
        </a>
        <a href="www.yandex.com" className="a">
          <img src={yandex} alt="yandex" />
        </a>
      </div>
    </div>
  );
};

export default LoginRegistrationForm;
