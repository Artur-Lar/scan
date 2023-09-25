import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./mainPage.css";
import mainImage from "./components/images/2398 1.png";
import clock from "./components/images/clock.png";
import search from "./components/images/search.png";
import guard from "./components/images/guard.png";
import arrowLeft from "./components/images/arrowLeft.png";
import arrowRight from "./components/images/arrowRight.png";
import imgWMan from "./components/images/imgWMan.png";
import lamp from "./components/images/lamp.png";
import target from "./components/images/target.png";
import laptop from "./components/images/laptop.png";

const MainPage = () => {
  const [slides, setSlides] = useState([
    {
      id: 1,
      image: clock,
      text: "Высокая и оперативная скорость обработки заявки",
    },
    {
      id: 2,
      image: search,
      text: "Огромная комплексная база данных, обеспечивающая объективный ответ на запрос",
    },
    {
      id: 3,
      image: guard,
      text: "Защита конфиденциальных сведений, не подлежащих разглашению по федеральному законодательству",
    },
  ]);

  const prevSlide = () => {
    setSlides((prevSlides) => {
      const lastSlide = prevSlides.pop();
      prevSlides.unshift(lastSlide);
      return [...prevSlides];
    });
  };

  const nextSlide = () => {
    setSlides((prevSlides) => {
      const firstSlide = prevSlides.shift();
      prevSlides.push(firstSlide);
      return [...prevSlides];
    });
  };

  return (
    <div>
      <div className="textImg">
        <div className="textBtn">
          <div className="service">
            сервис по поиску публикаций о компании по его ИНН
          </div>
          <div className="text1">
            Комплексный анализ публикаций, получение данных в формате PDF на
            электронную почту.
          </div>
          <Link to="/searchPage">
            <button className="btn-request">Запросить данные</button>
          </Link>
        </div>
        <div>
          <img src={mainImage} alt="mainImage" />
        </div>
      </div>
      <div className="text2">почему именно мы</div>
      <div className="slider">
        <button className="prev-button" onClick={prevSlide}>
          <img src={arrowLeft} alt="" />
        </button>
        {slides.map((slide) => (
          <div key={slide.id} className="slide1">
            <img className="imgSlide" src={slide.image} alt={slide.text} />
            <div className="textSlide">{slide.text}</div>
          </div>
        ))}
        <button className="next-button" onClick={nextSlide}>
          <img src={arrowRight} alt="" />
        </button>
      </div>
      <div className="imgWMan">
        <img src={imgWMan} alt="imgWMan" />
      </div>
      <div className="text2">наши тарифы</div>
      <div className="threeBlocks">
        <div className="beginnerBlock">
          <div className="beginHeader">
            <div className="beginHeaderText">
              <div className="beginner">Beginner</div>
              <div className="forInvestig">Для небольшого исследования</div>
            </div>
            <div>
              <img className="lamp" src={lamp} alt="lamp" />
            </div>
          </div>
          <div className="currentTarif">Текущий тариф</div>
          <div className="prices">
            <div className="beginner">799 &#8381;</div>
            <div className="oldPrice">1 200 &#8381;</div>
          </div>
          <div className="installment">
            или 150 ₽/мес. при рассрочке на 24 мес.
          </div>
          <div className="list">
            <ul>
              В тариф входит:
              <li>Безлимитная история запросов</li>
              <li>Безопасная сделка</li>
              <li>Поддержка 24/7</li>
            </ul>
          </div>
          <button className="toAccount-btn">Перейти в личный кабинет</button>
        </div>
        <div className="proBlock">
          <div className="proBlockHeader">
            <div className="beginHeaderText">
              <div className="beginner">Pro</div>
              <div className="forInvestig">Для HR и фрилансеров</div>
            </div>
            <div>
              <img className="lamp" src={target} alt="target" />
            </div>
          </div>
          <div className="prices">
            <div className="beginner">1 299 &#8381;</div>
            <div className="oldPrice">2 600 &#8381;</div>
          </div>
          <div className="installment">
            или 279 ₽/мес. при рассрочке на 24 мес.
          </div>
          <div className="list">
            <ul>
              В тариф входит:
              <li>Все пункты тарифа Beginner</li>
              <li>Экспорт истории</li>
              <li>Рекомендации по приоритетам</li>
            </ul>
          </div>
          <button className="detail-btn">Подробнее</button>
        </div>
        <div className="proBlock">
          <div className="busnsBlockHeader">
            <div className="beginHeaderText">
              <div className="bussinessTitle">Business</div>
              <div className="businessTxt">Для корпоративных клиентов</div>
            </div>
            <div>
              <img className="lamp" src={laptop} alt="laptop" />
            </div>
          </div>
          <div className="prices">
            <div className="beginner">2 379 &#8381;</div>
            <div className="oldPrice">3 700 &#8381;</div>
          </div>
          <div className="list">
            <ul>
              В тариф входит:
              <li>Все пункты тарифа Pro</li>
              <li>Безлимитное количество запросов</li>
              <li>Приоритетная поддержка</li>
            </ul>
          </div>
          <button className="detail-btn">Подробнее</button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
