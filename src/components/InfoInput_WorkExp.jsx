import { GetDataInput, GetDataButton } from "../modules/componentBuilder.jsx";
import { FocusHandler } from "../modules/Helper.jsx";

export default function InfoInput_WorkExp({ userData, setUserData }) {
  const setFocusElmInfo = FocusHandler();

  return (
    <div className="InfoInput_WorkExp main-input-section">
      {userData.workExperience.map((thisWork) => {
        return (
          <div key={thisWork.id} className="work-exp-section" id={thisWork.id}>
            {getWorkExpInputs(thisWork, userData, setUserData, setFocusElmInfo)}
            <GetDataButton
              btnType={"delete"}
              userData={userData}
              setUserData={setUserData}
              level_0_key={"workExperience"}
              level_1_id={thisWork.id}
            />
          </div>
        );
      })}
      <GetDataButton
        btnType={"add"}
        userData={userData}
        setUserData={setUserData}
        level_0_key={"workExperience"}
        setFocusElmInfo={setFocusElmInfo}
      />
    </div>
  );
}

function getWorkExpInputs(thisWork, userData, setUserData, setFocusElmInfo) {
  return (
    <div className="work-exp-inputs">
      {getWorkExpInputs_topLines(thisWork, userData, setUserData)}
      {getWorkExpInputs_jobSection(
        thisWork,
        userData,
        setUserData,
        setFocusElmInfo
      )}{" "}
    </div>
  );
}

function getWorkExpInputs_topLines(thisWork, userData, setUserData) {
  return (
    <div className="work-exp-top-lines-inputs">
      <GetDataInput
        userData={userData}
        setUserData={setUserData}
        level_0_key={"workExperience"}
        level_1_key={"employer"}
        level_1_id={thisWork.id}
      />

      <div className="work-exp-section-time">
        <GetDataInput
          userData={userData}
          setUserData={setUserData}
          level_0_key={"workExperience"}
          level_1_key={"totalTimeStart"}
          level_1_id={thisWork.id}
        />
        <GetDataInput
          userData={userData}
          setUserData={setUserData}
          level_0_key={"workExperience"}
          level_1_key={"totalTimeEnd"}
          level_1_id={thisWork.id}
        />
      </div>
    </div>
  );
}

function getWorkExpInputs_jobSection(
  thisWork,
  userData,
  setUserData,
  setFocusElmInfo
) {
  return (
    <>
      {thisWork.jobsInfo.map((thisJob) => {
        return (
          <div
            key={thisJob.id}
            className="work-exp-job-section"
            id={thisJob.id}
          >
            <GetDataInput
              userData={userData}
              setUserData={setUserData}
              level_0_key={"workExperience"}
              level_1_key={"jobsInfo"}
              level_1_id={thisWork.id}
              level_2_key={"position"}
              level_2_id={thisJob.id}
            />

            {thisWork.jobsInfo.length > 1 ? (
              <div className="job-exp-section-time">
                <GetDataInput
                  userData={userData}
                  setUserData={setUserData}
                  level_0_key={"workExperience"}
                  level_1_key={"jobsInfo"}
                  level_1_id={thisWork.id}
                  level_2_key={"timeStart"}
                  level_2_id={thisJob.id}
                />
                <GetDataInput
                  userData={userData}
                  setUserData={setUserData}
                  level_0_key={"workExperience"}
                  level_1_key={"jobsInfo"}
                  level_1_id={thisWork.id}
                  level_2_key={"timeEnd"}
                  level_2_id={thisJob.id}
                />
              </div>
            ) : null}

            <div className="wrapper">
              <GetDataInput
                userData={userData}
                setUserData={setUserData}
                level_0_key={"workExperience"}
                level_1_key={"jobsInfo"}
                level_1_id={thisWork.id}
                level_2_key={"location"}
                level_2_id={thisJob.id}
              />
            </div>
            {getWorkExpInputs_listInputs(
              thisWork,
              thisJob,
              userData,
              setUserData,
              setFocusElmInfo
            )}
            <GetDataButton
              btnType={"delete"}
              userData={userData}
              setUserData={setUserData}
              level_0_key={"workExperience"}
              level_1_key={"jobsInfo"}
              level_1_id={thisWork.id}
              level_2_id={thisJob.id}
            />
          </div>
        );
      })}
      <GetDataButton
        btnType={"add"}
        userData={userData}
        setUserData={setUserData}
        level_0_key={"workExperience"}
        level_1_key={"jobsInfo"}
        level_1_id={thisWork.id}
        setFocusElmInfo={setFocusElmInfo}
      />
    </>
  );
}

function getWorkExpInputs_listInputs(
  thisWork,
  thisJob,
  userData,
  setUserData,
  setFocusElmInfo
) {
  const workExpListKeys = ["duties", "stack", "keyResults"];

  return (
    <div className="jobsInfo-input-lists">
      {workExpListKeys.map((workExpListKey, topIndex) => {
        return (
          <div
            key={"workExpListKey" + topIndex}
            className={`jobsInfo-input-list-${workExpListKey}`}
          >
            {workExpListKey === "keyResults" ? "key results" : workExpListKey}
            {": "}
            <div className="list-item-inputs">
              {thisJob[workExpListKey].map((_, index) => {
                return (
                  <div className={workExpListKey + "-list-item"} key={index}>
                    <GetDataInput
                      userData={userData}
                      setUserData={setUserData}
                      level_0_key={"workExperience"}
                      level_1_key={"jobsInfo"}
                      level_1_id={thisWork.id}
                      level_2_key={workExpListKey}
                      level_2_id={thisJob.id}
                      listIndexToChange={index}
                    />
                    <GetDataButton
                      btnType={"delete"}
                      userData={userData}
                      setUserData={setUserData}
                      level_0_key={"workExperience"}
                      level_1_key={"jobsInfo"}
                      level_1_id={thisWork.id}
                      level_2_key={workExpListKey}
                      level_2_id={thisJob.id}
                      listIndexToChange={index}
                      setFocusElmInfo={setFocusElmInfo}
                    />
                  </div>
                );
              })}
            </div>
            <GetDataButton
              btnType={"add"}
              userData={userData}
              setUserData={setUserData}
              level_0_key={"workExperience"}
              level_1_key={"jobsInfo"}
              level_1_id={thisWork.id}
              level_2_key={workExpListKey}
              level_2_id={thisJob.id}
              setFocusElmInfo={setFocusElmInfo}
            />
          </div>
        );
      })}
    </div>
  );
}
