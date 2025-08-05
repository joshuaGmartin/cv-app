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

export default function InfoInput({ setUserData }) {
  const [infoSelection, setInfoSelection] = useState("Personal");

  function infoSelectionComponent() {
    switch (infoSelection) {
      case "Education":
        return <EducationInfoInput setUserData={setUserData} />;
      case "Relevant Work Experience":
        return <WorkExpInfoInput setUserData={setUserData} />;
      case "Skills & Interests":
        return <SkillsAndIntInfoInput setUserData={setUserData} />;
      default:
        return <PersonalInfoInput setUserData={setUserData} />;
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
