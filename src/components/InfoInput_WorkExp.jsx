import * as componentBuilder from "../modules/componentBuilder.jsx";
import { FocusHandler } from "../modules/Helper.jsx";

export default function InfoInput_WorkExp({
  userData,
  setUserData,
  resetData,
}) {
  const setFocusElementInfo = FocusHandler();

  return (
    <div className="InfoInput_WorkExp">
      {userData.workExperience.map((thisWork) => {
        return (
          <div key={thisWork.id} className="work-exp-section">
            {getWorkExpInputs(
              thisWork,
              userData,
              setUserData,
              setFocusElementInfo,
              resetData
            )}
          </div>
        );
      })}
      {componentBuilder.getAddSectionButton(
        userData,
        setUserData,
        resetData,
        "workExperience"
      )}
    </div>
  );
}

function getWorkExpInputs(
  thisWork,
  userData,
  setUserData,
  setFocusElementInfo,
  resetData
) {
  return (
    <div className="work-exp-inputs">
      {getWorkExpInputs_topLines(thisWork, userData, setUserData)}
      {getWorkExpInputs_jobSection(
        thisWork,
        userData,
        setUserData,
        resetData
      )}{" "}
    </div>
  );
}

function getWorkExpInputs_topLines(thisWork, userData, setUserData) {
  return (
    <div className="work-exp-top-lines-inputs">
      {componentBuilder.getTextInput(
        thisWork,
        "employer",
        userData,
        setUserData,
        thisWork.id + "-employer-input",
        "workExperience"
      )}

      <div className="work-exp-section-time">
        {componentBuilder.getTextInput(
          thisWork,
          "totalTimeStart",
          userData,
          setUserData,
          thisWork.id + "-totalTimeStart-input",
          "workExperience"
        )}
        {componentBuilder.getTextInput(
          thisWork,
          "totalTimeEnd",
          userData,
          setUserData,
          thisWork.id + "-totalTimeEnd-input",
          "workExperience"
        )}
      </div>
    </div>
  );
}

function getWorkExpInputs_jobSection(
  thisWork,
  userData,
  setUserData,
  resetData
) {
  return (
    <>
      {thisWork.jobsInfo.map((thisJob) => {
        return (
          <div key={thisJob.id} className="work-exp-job-section">
            {componentBuilder.getTextInput_nested1(
              userData,
              setUserData,
              thisWork,
              "workExperience",
              thisJob,
              "jobsInfo",
              "position",
              thisWork.id + "-position-input"
            )}

            {thisWork.jobsInfo.length > 1 ? (
              <>
                {componentBuilder.getTextInput_nested1(
                  userData,
                  setUserData,
                  thisWork,
                  "workExperience",
                  thisJob,
                  "jobsInfo",
                  "timeStart",
                  thisWork.id + "-timeStart-input"
                )}
                {componentBuilder.getTextInput_nested1(
                  userData,
                  setUserData,
                  thisWork,
                  "workExperience",
                  thisJob,
                  "jobsInfo",
                  "timeEnd",
                  thisWork.id + "-timeEnd-input"
                )}
              </>
            ) : null}

            {/* {getWorkExpInputs_listInputs(
              thisWork,
              userData,
              setUserData,
              setFocusElementInfo
              )} */}
            {componentBuilder.getTextInput_nested1(
              userData,
              setUserData,
              thisWork,
              "workExperience",
              thisJob,
              "jobsInfo",
              "location",
              thisWork.id + "-location-input"
            )}
          </div>
        );
      })}
      {componentBuilder.getAddSectionButton_nested1(
        userData,
        setUserData,
        thisWork,
        "workExperience",
        "jobsInfo",
        resetData
      )}
    </>
  );
}

function getWorkExpInputs_listInputs(
  thisWork,
  userData,
  setUserData,
  setFocusElementInfo
) {
  return;
}
