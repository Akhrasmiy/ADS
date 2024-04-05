import Regester from "./components/regester";
import { Routes, Route } from "react-router-dom";
import MainPage from "./mainpage";
import Addelem from "./components/AddElem";
import SignIn from "./components/signIn";
import { useEffect, useState } from "react";
import axios from "axios";
import Admin from "./components/adminpage/Admin";
import Adminresponse from "./components/adminpage/adminresponse";
import Adminstatus from "./components/adminpage/status";
import Adminads from "./components/adminpage/aadminads";
import Adminuserresponse from "./components/adminpage/adminuserresponse";
import Payments from "./components/payments";

document.title = "Pul Bor";
function App() {
  const [is_admin, setis_admin] = useState(false);
  console.log(process.env.REACT_APP_URL);
  // console.log(inputref.current.value)

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`http://localhost:3001/users/is_admin`, {
        headers: { Authorization: token },
      })
      .then((response) => {
        console.log(response);
        setis_admin(response.data.data);
      })
      .catch((err) => {
        localStorage.setItem("token", "");
      });
  }, []);
  return (
    <div className="App">
      {token ? (
        !is_admin ? (
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/Profile" element={<Addelem />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/*" element={<MainPage />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/response" element={<Adminresponse />} />
            <Route path="/admin/userresponse" element={<Adminuserresponse />} />
            <Route path="/admin/status" element={<Adminstatus />} />
            <Route path="/admin/ads" element={<Adminads />} />

            <Route path="/*" element={<Admin />} />
          </Routes>
        )
      ) : (
        <Routes>
          <Route path="/regester" element={<Regester />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/*" element={<Regester />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
