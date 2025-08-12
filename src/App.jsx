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
      {/* test */}
      {/* <GetDataInput
        // e={null}
        userData={userData}
        setUserData={setUserData}
        level_0_key={"personal"}
        level_1_key={"fullname"}
        level_1_id={null}
        level_2_key={null}
        level_2_id={null}
        listIndexToChange={null}
      /> */}
      {/* <GetDataInput
        // e={null}
        userData={userData}
        setUserData={setUserData}
        level_0_key={"education"}
        level_1_key={"minorOrSpec"}
        level_1_id={userData.education[0].id}
        level_2_key={null}
        level_2_id={null}
        listIndexToChange={null}
      /> */}
      {/* <GetDataInput
        // e={null}
        userData={userData}
        setUserData={setUserData}
        level_0_key={"education"}
        level_1_key={"minor"}
        level_1_id={userData.education[0].id}
        level_2_key={null}
        level_2_id={null}
        listIndexToChange={null}
      /> */}
      {/* <GetDataInput
        // e={null}
        userData={userData}
        setUserData={setUserData}
        level_0_key={"education"}
        level_1_key={"specialization"}
        level_1_id={userData.education[0].id}
        level_2_key={null}
        level_2_id={null}
        listIndexToChange={null}
      /> */}
      {/* <GetDataInput
        // e={null}
        userData={userData}
        setUserData={setUserData}
        level_0_key={"education"}
        level_1_key={"includeGPA"}
        level_1_id={userData.education[0].id}
        level_2_key={null}
        level_2_id={null}
        listIndexToChange={null}
      /> */}
      {/* <GetDataInput
        // e={null}
        userData={userData}
        setUserData={setUserData}
        level_0_key={"education"}
        level_1_key={"coursework"}
        level_1_id={userData.education[0].id}
        level_2_key={null}
        level_2_id={null}
        listIndexToChange={0}
      /> */}
      {/* <GetDataInput
        // e={null}
        userData={userData}
        setUserData={setUserData}
        level_0_key={"workExperience"}
        level_1_key={"employer"}
        level_1_id={userData.workExperience[0].id}
        level_2_key={null}
        level_2_id={null}
        listIndexToChange={null}
      /> */}
      {/* <GetDataInput
        // e={null}
        userData={userData}
        setUserData={setUserData}
        level_0_key={"workExperience"}
        level_1_key={"jobsInfo"}
        level_1_id={userData.workExperience[0].id}
        level_2_key={"duties"}
        level_2_id={userData.workExperience[0].jobsInfo[0].id}
        listIndexToChange={0}
      /> */}
      {/* <GetDataInput
        // e={null}
        userData={userData}
        setUserData={setUserData}
        level_0_key={"workExperience"}
        level_1_key={"jobsInfo"}
        level_1_id={userData.workExperience[0].id}
        level_2_key={"location"}
        level_2_id={userData.workExperience[0].jobsInfo[0].id}
        listIndexToChange={null}
      /> */}
      <GetDataInput
        // e={null}
        userData={userData}
        setUserData={setUserData}
        level_0_key={"workExperience"}
        level_1_key={"jobsInfo"}
        level_1_id={userData.workExperience[0].id}
        level_2_key={"location"}
        level_2_id={userData.workExperience[0].jobsInfo[0].id}
        listIndexToChange={null}
      />
      {/* end of test */}

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
