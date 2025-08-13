import { GetDataInput, GetDataButton } from "../modules/componentBuilder.jsx";
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
          <div key={thisWork.id} className="work-exp-section" id={thisWork.id}>
            {getWorkExpInputs(
              thisWork,
              userData,
              setUserData,
              setFocusElementInfo,
              resetData
            )}
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
      {/* check this <--------------------------------------------------- */}
      <GetDataButton
        btnType={"add"}
        userData={userData}
        setUserData={setUserData}
        level_0_key={"workExperience"}
      />
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
        resetData,
        setFocusElementInfo
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
  resetData,
  setFocusElementInfo
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
              listIndexToChange={""}
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
                  listIndexToChange={""}
                />
                <GetDataInput
                  userData={userData}
                  setUserData={setUserData}
                  level_0_key={"workExperience"}
                  level_1_key={"jobsInfo"}
                  level_1_id={thisWork.id}
                  level_2_key={"timeEnd"}
                  level_2_id={thisJob.id}
                  listIndexToChange={""}
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
              setFocusElementInfo
            )}

            {/* delete job button */}
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
  thisJob,
  userData,
  setUserData,
  setFocusElementInfo
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
            <div className="list-item-inputs">
              {workExpListKey === "keyResults" ? "key results" : workExpListKey}
              {": "}
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
                      setFocusElementInfo={setFocusElementInfo}
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
                level_2_key={workExpListKey}
                level_2_id={thisJob.id}
                setFocusElementInfo={setFocusElementInfo}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// <div className="list-item-inputs">
//               duties:
//               {thisJob.duties.map((_, index) => {
//                 return (
//                   <div className="job-duty" key={index}>
//                     <GetDataInput
//                       userData={userData}
//                       setUserData={setUserData}
//                       level_0_key={"workExperience"}
//                       level_1_key={"jobsInfo"}
//                       level_1_id={thisWork.id}
//                       level_2_key={"duties"}
//                       level_2_id={thisJob.id}
//                       listIndexToChange={index}
//                     />
//                     <GetDataButton
//                       btnType={"delete"}
//                       userData={userData}
//                       setUserData={setUserData}
//                       level_0_key={"workExperience"}
//                       level_1_key={"jobsInfo"}
//                       level_1_id={thisWork.id}
//                       level_2_key={"duties"}
//                       level_2_id={thisJob.id}
//                       listIndexToChange={index}
//                       setFocusElementInfo={setFocusElementInfo}
//                     />
//                   </div>
//                 );
//               })}
//               <GetDataButton
//                 btnType={"add"}
//                 userData={userData}
//                 setUserData={setUserData}
//                 level_0_key={"workExperience"}
//                 level_1_key={"jobsInfo"}
//                 level_1_id={thisWork.id}
//                 level_2_key={"duties"}
//                 level_2_id={thisJob.id}
//                 setFocusElementInfo={setFocusElementInfo}
//               />
//             </div>
