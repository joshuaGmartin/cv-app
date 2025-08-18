import { GetDataInput, GetDataButton } from "../modules/componentBuilder.jsx";
import { FocusHandler } from "../modules/Helper.jsx";

export default function InfoInput_SkillsAndInt({ userData, setUserData }) {
  const setFocusElmInfo = FocusHandler();

  return (
    <div className="InfoInput_SkillsAndInt main-input-section">
      {Object.keys(userData.skillsAndInt).map((level_1_key) => {
        const thisSectionID = "skillsAndInt-" + level_1_key + "-section";

        return (
          <div
            key={thisSectionID}
            className={`skillsAndInt-section-${level_1_key}`}
            id={thisSectionID}
          >
            {getSkillsAndIntInputs_listInputs(
              level_1_key,
              userData,
              setUserData,
              setFocusElmInfo,
              thisSectionID
            )}
          </div>
        );
      })}
    </div>
  );
}

function getSkillsAndIntInputs_listInputs(
  level_1_key,
  userData,
  setUserData,
  setFocusElmInfo,
  thisSectionID
) {
  let sectionLabel = level_1_key;

  switch (level_1_key) {
    case "hardSkillsTech":
      sectionLabel = "hard skills (tech)";
      break;
    case "hardSkillsOther":
      sectionLabel = "hard skills (other)";
      break;
    case "softSkills":
      sectionLabel = "soft skills";
      break;
  }

  return (
    <>
      {sectionLabel + ": "}
      <div className={`skillsAndInt-input-list-${level_1_key}`}>
        <div className="list-item-inputs">
          {userData.skillsAndInt[level_1_key].map((thisListItem, index) => {
            return (
              <div
                key={`${level_1_key}-${index}`}
                className="list-input-and-del-btn"
              >
                <GetDataInput
                  userData={userData}
                  setUserData={setUserData}
                  level_0_key={"skillsAndInt"}
                  level_1_key={level_1_key}
                  listIndexToChange={index}
                />
                <GetDataButton
                  btnType="delete"
                  userData={userData}
                  setUserData={setUserData}
                  level_0_key={"skillsAndInt"}
                  level_1_key={level_1_key}
                  listIndexToChange={index}
                />
              </div>
            );
          })}
        </div>
        <GetDataButton
          btnType="add"
          userData={userData}
          setUserData={setUserData}
          level_0_key={"skillsAndInt"}
          level_1_key={level_1_key}
          level_1_id={thisSectionID}
          setFocusElmInfo={setFocusElmInfo}
        />
      </div>
    </>
  );
}
