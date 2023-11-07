import React from "react";
/*import { useEffect } from "react";*/
import { useSelector } from "react-redux";
import find from "./images/find.png";
import "./styles/result.css";

export default function Result() {
  const results = useSelector((state) => state.app.responseData);

  console.log(results.data);

  if (!results || results.length === 0) {
    return <div>Данные пустые, либо не найдены</div>;
  }

  const sumResults = results.reduce(
    (total, elem) => total + elem.data.length,
    0
  );

  return (
    <div>
      <div className="findTxtImg">
        <div>
          <div className="resultSoon">Ищем. Скоро будут результаты</div>
          <div className="wait">
            Поиск может занять некоторое время, просим сохранять терпение.
          </div>
          <div className="summary">Общая сводка</div>
          <div className="found">Найдено {sumResults} вариантов</div>
        </div>
        <div>
          <img className="findImg" src={find} alt="find" />
        </div>
      </div>
      <div className="results" id="results">
        {Array.isArray(results) && results.length !== 0 && (
          <div>
            {results.map((result) => (
              <div key={result.histogramType}>
                {result.data.map((item) => (
                  <div key={item.date}>
                    {item.data.map((elem) => (
                      <p key={elem.date}>
                        Дата: {elem.date}, Количество публикаций: {elem.value}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
