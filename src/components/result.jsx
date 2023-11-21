import React, { useRef } from "react";
import { useSelector } from "react-redux";
import find from "./images/find.png";
import "./styles/result.css";
import arrowLeft from "./images/arrowLeft.png";
import arrowRight from "./images/arrowRight.png";

export default function Result() {
  const results = useSelector((state) => state.app.responseData);
  const resultsContainerRef = useRef(null);

  console.log(results.data);

  if (!results || results.length === 0) {
    return <div>Данные пустые, либо не найдены</div>;
  }

  const sumResults = results.reduce(
    (total, elem) =>
      total + elem.data.reduce((sum, item) => sum + item.data.length, 0),
    0
  );

  // Функция для форматирования даты
  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const day = dateObject.getDate().toString().padStart(2, "0");
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
    const year = dateObject.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const scrollResults = (amount) => {
    if (resultsContainerRef.current) {
      resultsContainerRef.current.scrollLeft += amount;
    }
  };

  return (
    <div className="conteiner">
      <div className="findTxtImg">
        <div>
          <div className="resultSoon">Ищем. Скоро будут результаты</div>
          <div className="wait">
            Поиск может занять некоторое время, просим сохранять терпение.
          </div>
        </div>
        <div>
          <img className="findImg" src={find} alt="find" />
        </div>
      </div>
      <div className="summary">Общая сводка</div>
      <div className="found">Найдено {sumResults} вариантов</div>
      <div className="btnsAndResults">
        <button className="next-button" onClick={() => scrollResults(-100)}>
          <img src={arrowLeft} alt="" />
        </button>
        <div className="resultsHeader">
          <div>Период</div>
          <div>Всего</div>
          <div>Риски</div>
        </div>
        <div className="tableForResults" id="results" ref={resultsContainerRef}>
          {Array.isArray(results) && results.length !== 0 && (
            <div>
              {results.map((result) => (
                <div key={result.histogramType}>
                  {result.data.map((item) => (
                    <div className="rowForResults" key={item.histogramType}>
                      {item.data.map((elem) => (
                        <div className="cellOfResult" key={elem.date}>
                          <p className="textOfResult">
                            {formatDate(elem.date)}
                          </p>
                          <p className="textOfResult">{elem.value}</p>
                          {/* Добавляем значение из riskFactors */}
                          {result.histogramType === "totalDocuments" && (
                            <p>
                              {result.data
                                .find(
                                  (item) => item.histogramType === "riskFactors"
                                )
                                .data.find(
                                  (riskItem) => riskItem.date === elem.date
                                )?.value ?? 0}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
        <button className="next-button" onClick={() => scrollResults(100)}>
          <img src={arrowRight} alt="" />
        </button>
      </div>
      <div className="summary">Список документов</div>
    </div>
  );
}
