import "./App.css";
import { Header } from "./components/Header.jsx";
import InfoInput from "./components/InfoInput.jsx";
import Resume from "./components/Resume.jsx";
import { joshData } from "./modules/userData.js";
import { useState } from "react";

function App() {
  const [userData, setUserData] = useState(joshData);

  return (
    <>
      <Header setUserData={setUserData}></Header>
      <div className="main-section">
        <InfoInput userData={userData} setUserData={setUserData}></InfoInput>
        <Resume userData={userData}></Resume>
      </div>
    </>
  );
}

export default App;
