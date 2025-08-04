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

export default function InfoInput() {
  const [infoSelection, setInfoSelection] = useState("Personal");

  function infoSelectionComp() {
    switch (infoSelection) {
      case "Education":
        return <EducationInfoInput />;
      case "Relevant Work Experience":
        return <WorkExpInfoInput />;
      case "Skills & Interests":
        return <SkillsAndIntInfoInput />;
      default:
        return <PersonalInfoInput />;
    }
  }

  return (
    <div className="InfoInput">
      <div className="infoSectionSelectors">
        {infoSections.map((section) => {
          return (
            <InfoSectionSelector
              value={section}
              onClick={() => setInfoSelection(section)}
            />
          );
        })}
      </div>

      {infoSelectionComp()}
    </div>
  );
}
