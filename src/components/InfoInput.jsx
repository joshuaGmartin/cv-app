import { useState } from "react";
import InfoSectionSelector from "./InfoSectionSelector";
import PersonalInfoInput from "./PersonalInfoInput";
import EducationInfoInput from "./EducationInfoInput";
import WorkExpInfoInput from "./WorkExpInfoInput";
import SkillsAndIntInfoInput from "./SkillsAndIntInfoInput";

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
          <EducationInfoInput userData={userData} setUserData={setUserData} />
        );
      case "Relevant Work Experience":
        return (
          <WorkExpInfoInput userData={userData} setUserData={setUserData} />
        );
      case "Skills & Interests":
        return (
          <SkillsAndIntInfoInput
            userData={userData}
            setUserData={setUserData}
          />
        );
      default:
        return (
          // <PersonalInfoInput userData={userData} setUserData={setUserData} />
          <EducationInfoInput userData={userData} setUserData={setUserData} />
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
