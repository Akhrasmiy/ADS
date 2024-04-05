import "./App.css";
import Header from "./layout/header";
import Nav from "./layout/nav";
import Main from "./layout/main";
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
function MainPage() {
  return (
    <div className="MainPage">
      <Header />
      <div className="mainlayout">
        <Main />
      </div>
      <div className="hbp"></div>
    </div>
  );
}

export default MainPage;
