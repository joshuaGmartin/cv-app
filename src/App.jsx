import { useState } from "react";
import "./App.css";
import InfoInput from "./components/InfoInput.jsx";
import Resume from "./components/Resume.jsx";
import { joshData } from "./modules/userData.js";

function App() {
  const [userData, setUserData] = useState(joshData);

  return (
    <>
      <InfoInput userData={userData} setUserData={setUserData}></InfoInput>
      <Resume userData={userData}></Resume>
    </>
  );
}

export default App;
