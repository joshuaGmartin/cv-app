import { useState } from "react";
import "./App.css";
import InfoInput from "./components/InfoInput.jsx";
import Resume from "./components/Resume.jsx";
import { joshData, resetData } from "./modules/userData.js";

//test
import { GetDataInput } from "./modules/componentBuilder.jsx";

function App() {
  const [userData, setUserData] = useState(joshData);

  return (
    <>
      <InfoInput
        userData={userData}
        setUserData={setUserData}
        resetData={resetData}
      ></InfoInput>
      <Resume userData={userData}></Resume>
    </>
  );
}

export default App;
