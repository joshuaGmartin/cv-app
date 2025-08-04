import { useState } from "react";
import "./App.css";
import InfoInput from "./components/InfoInput.jsx";
import Resume from "./components/Resume.jsx";
import userDataImport from "./userData.js";

function App() {
  const [userData, setUserData] = useState(userDataImport);

  return (
    <>
      <InfoInput setUserData={setUserData}></InfoInput>
      <Resume userData={userData}></Resume>
    </>
  );
}

export default App;
