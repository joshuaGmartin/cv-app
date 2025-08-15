import { useState } from "react";
import InfoInput_Personal from "./InfoInput_Personal";
import InfoInput_Education from "./InfoInput_Education";
import InfoInput_WorkExp from "./InfoInput_WorkExp";
import InfoInput_SkillsAndInt from "./InfoInput_SkillsAndInt";

const infoSections = [
  "Personal",
  "Education",
  "Relevant Work Experience",
  "Skills & Interests",
];

export default function InfoInput({ userData, setUserData }) {
  const [infoSelection, setInfoSelection] = useState("Personal");

  function infoSelectionComponent() {
    switch (infoSelection) {
      case "Education":
        return (
          <InfoInput_Education userData={userData} setUserData={setUserData} />
        );
      case "Relevant Work Experience":
        return (
          <InfoInput_WorkExp userData={userData} setUserData={setUserData} />
        );
      case "Skills & Interests":
        return (
          <InfoInput_SkillsAndInt
            userData={userData}
            setUserData={setUserData}
          />
        );
      default:
        return (
          <InfoInput_Personal userData={userData} setUserData={setUserData} />

          // <InfoInput_Education userData={userData} setUserData={setUserData} />

          // <InfoInput_WorkExp userData={userData} setUserData={setUserData} />

          // <InfoInput_SkillsAndInt
          //   userData={userData}
          //   setUserData={setUserData}
          // />
        );
    }
  }

  return (
    <div className="InfoInput">
      <div className="infoSectionSelectors">
        {infoSections.map((section) => {
          return (
            <InfoSectionSelector
              key={section}
              value={section}
              onClick={() => setInfoSelection(section)}
            />
          );
        })}
      </div>

      {infoSelectionComponent()}
    </div>
  );
}

function InfoSectionSelector({ value, onClick }) {
  return (
    <div className="InfoSectionSelector" onClick={onClick}>
      {value}
    </div>
  );
}
