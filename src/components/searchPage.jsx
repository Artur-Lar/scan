import React, { useState } from "react";
import { Link } from "react-router-dom";
import Folders from "./images/Folders.png";
import Documents from "./images/Document.png";
import rocket from "./images/rocket.png";
import "./styles/searchPage.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchSearchResults } from "./services/searchService.js";

export default function SearchPage() {
  const [results, setResults] = useState([]);
  const dispatch = useDispatch();
  const [accessToken, setAccessToken] = useState(""); //  состояние для хранения токена

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setAccessToken(accessToken);
    }
  }, []);

  useEffect(() => {
    setResults(results);
    console.log(results, "весь массив");
    console.log(results.data, "data");
  }, [results]);

  // для отправки запроса к АПИ
  const sendAPIRequest = async (formData) => {
    try {
      const data = await fetchSearchResults(formData, accessToken); // Используем сервис для выполнения запроса
      setResults([data]);
      dispatch({ type: "SET_RESPONSE_DATA", payload: data });
    } catch (error) {
      console.error(error);
      // Обработка ошибки, например, отображение сообщения пользователю
    }
  };

  // Обработчик события для отправки формы
  const handleSubmit = (event) => {
    event.preventDefault();

    // Получаем значения полей формы
    const inn = event.target.elements.inn.value;
    const documentsCount = event.target.elements.documentsCount.value;
    const startDate = event.target.elements.startDate.value;
    const endDate = event.target.elements.endDate.value;

    // Получаем значения чекбоксов
    const checkboxes = event.target.querySelectorAll(".checkbox");
    const checkboxValues = [];
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        checkboxValues.push(checkbox.value);
      }
    });

    // Создаем объект с данными для запроса к АПИ
    const formData = {
      intervalType: "month",
      histogramTypes: ["totalDocuments", "riskFactors"],
      issueDateInterval: {
        startDate,
        endDate,
      },
      searchContext: {
        targetSearchEntitiesContext: {
          targetSearchEntities: [
            {
              type: "company",
              sparkId: null,
              entityId: null,
              inn: Number(inn), // Преобразуем в число
              maxFullness: true,
              inBusinessNews: null,
            },
          ],
          onlyMainRole: true,
          tonality: "any",
          onlyWithRiskFactors: checkboxValues.includes("risks"), // Включить риск-факторы на основе выбранных чекбоксов
          riskFactors: {
            and: [],
            or: [],
            not: [],
          },
          themes: {
            and: [],
            or: [],
            not: [],
          },
        },
        themesFilter: {
          and: [],
          or: [],
          not: [],
        },
      },
      searchArea: {
        includedSources: [],
        excludedSources: [],
        includedSourceGroups: [],
        excludedSourceGroups: [],
      },
      attributeFilters: {
        excludeTechNews: true,
        excludeAnnouncements: true,
        excludeDigests: true,
      },
      similarMode: "duplicates",
      limit: documentsCount,
      sortType: "sourceInfluence",
      sortDirectionType: "desc",
    };

    sendAPIRequest(formData);
  };

  return (
    <div>
      <div className="searchTxtImg">
        <div>
          <div className="searchDateTxt">
            Найдите необходимые данные в пару кликов.
          </div>
          <div className="searchParams">
            Задайте параметры поиска.
            <br />
            Чем больше заполните, тем точнее поиск
          </div>
        </div>
        <div>
          <img className="img" src={Documents} alt="documents" />
          <img className="img" src={Folders} alt="folders" />
        </div>
      </div>
      <div className="formAndImg">
        <form onSubmit={handleSubmit} className="form">
          <div className="inputs">
            <label>ИНН компании *</label>
            <br />
            <input
              className="input"
              type="number"
              name="inn"
              placeholder="10 цифр"
            />
            <br />
            <label>Тональность</label>
            <br />
            <select className="input" name="tonality" defaultValue="Any">
              <option value="Any">Любая</option>
              <option value="Positive">Позитивная</option>
              <option value="Negative">Негативная</option>
            </select>
            <br />
            <label>Количество документов в выдаче</label>
            <br />
            <input
              className="input"
              type="number"
              name="documentsCount"
              placeholder="От 1 до 1000"
            />
            <br />
            <label>Диапазон поиска *</label>
            <br />
            <div className="inputsDates">
              <input
                className="inputDate"
                type="date"
                name="startDate"
                placeholder="Дата начала"
              />
              <input className="inputDate" type="date" name="endDate" />
            </div>
          </div>
          <div className="checkboxes">
            <div className="formCheckboxes">
              <label className="titleCheckbox">
                <input className="checkbox" type="checkbox" value="full" />{" "}
                <span className="textCheckbox">
                  Публикации только с риск-факторами
                </span>
              </label>
              <br />
              <label className="titleCheckbox">
                <input className="checkbox" type="checkbox" value="business" />{" "}
                <span className="textCheckbox">
                  Упоминания в бизнес-контексте
                </span>
              </label>
              <br />
              <label className="titleCheckbox">
                <input className="checkbox" type="checkbox" value="role" />{" "}
                <span className="textCheckbox">Главная роль в публикации</span>
              </label>
              <br />
              <label className="titleCheckbox">
                <input className="checkbox" type="checkbox" value="risks" />{" "}
                <span className="textCheckbox">
                  Публикации только с риск-факторами
                </span>
              </label>
              <br />
              <label className="titleCheckbox">
                <input className="checkbox" type="checkbox" value="techNews" />{" "}
                <span className="textCheckbox">
                  Включать технические новости рынков
                </span>
              </label>
              <br />
              <label className="titleCheckbox">
                <input className="checkbox" type="checkbox" value="anounces" />{" "}
                <span className="textCheckbox">
                  Включать анонсы и календари
                </span>
              </label>
              <br />
              <label className="titleCheckbox">
                <input className="checkbox" type="checkbox" value="news" />{" "}
                <span className="textCheckbox">Включать сводки новостей</span>
              </label>
            </div>
            <button type="submit" className="searchBtn">
              Поиск
              <Link to="/result">Поиск</Link>
            </button>
            <p className="nessesFields">* Обязательные к заполнению поля</p>
          </div>
        </form>
        <div>
          <img className="rocket" src={rocket} alt="rocket" />
        </div>
      </div>
      {/* Вывод результатов на странице */}
      <div className="results" id="results">
        {results.length !== 0 && (
          <div>
            {results.map((result) => (
              <div key={result.histogramType}>
                <h2>
                  {result.histogramType === "totalDocuments"
                    ? "Количество публикаций"
                    : "Количество публикаций с риск-факторами"}
                </h2>
                {result.data.map((item) => {
                  console.log(item.data, "item");
                  return item.data.map((elem) => {
                    return (
                      <p key={elem.date}>
                        Дата: {elem.date}, Количество публикаций: {elem.value}
                      </p>
                    );
                  });
                  // return (
                  //   <p key={item.date}>
                  //     Дата: {item.date}, Количество публикаций: {item.value}
                  //   </p>
                  // );
                })}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
