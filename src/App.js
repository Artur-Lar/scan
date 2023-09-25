import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./mainPage";
import "./style.css";
import "./mainPage.css";
import Registration from "./components/registration";
import SearchPage from "./components/searchPage";
import Result from "./components/result";
import { Provider } from "react-redux";
import store from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Routes>
            <Route path="/main" element={<MainPage />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/searchPage" element={<SearchPage />} />
            <Route path="/result" element={<Result />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
