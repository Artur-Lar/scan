import React from "react";
import { useSelector } from "react-redux";
import find from "./images/find.png";
import "./styles/result.css";

export default function Result() {
  const results = useSelector((state) => state.app.responseData);

  console.log(results);

  if (results === undefined /*|| !Array.isArray(results)*/) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="findTxtImg">
        <div>
          <div className="resultSoon">Ищем. Скоро будут результаты</div>
          <div className="wait">
            Поиск может занять некоторое время, просим сохранять терпение.
          </div>
          <div className="summary">Общая сводка</div>
          <div className="found">Найдено 4 221 вариантов</div>
          <div className="results" id="results">
            <p>Длина результата1{results.length}</p>
            {Array.isArray(results) && results.length !== 0 && (
              <div>
                {results.map((result) => (
                  <div key={result.histogramType}>
                    <h2>
                      {result.histogramType === "totalDocuments"
                        ? "Количество публикаций"
                        : "Количество публикаций с риск-факторами"}
                    </h2>
                    {result.data.map((item) => (
                      <div key={item.date}>
                        {item.data.map((elem) => (
                          <p key={elem.date}>
                            Дата: {elem.date}, Количество публикаций:{" "}
                            {elem.value}
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
        <div>
          <img className="findImg" src={find} alt="find" />
        </div>
      </div>
    </div>
  );
}
