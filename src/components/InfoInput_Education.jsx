import { GetDataInput, GetDataButton } from "../modules/componentBuilder.jsx";
import { FocusHandler } from "../modules/Helper.jsx";

export default function InfoInput_Education({ userData, setUserData }) {
  const setFocusElmInfo = FocusHandler();

  return (
    <div className="InfoInput_Education main-input-section">
      {userData.education.map((thisEd) => {
        return (
          <div key={thisEd.id} className="education-section" id={thisEd.id}>
            {getEducationInputs(thisEd, userData, setUserData, setFocusElmInfo)}
            <GetDataButton
              btnType={"delete"}
              userData={userData}
              setUserData={setUserData}
              level_0_key={"education"}
              level_1_id={thisEd.id}
            />
          </div>
        );
      })}

      <GetDataButton
        btnType={"add"}
        userData={userData}
        setUserData={setUserData}
        level_0_key={"education"}
        setFocusElmInfo={setFocusElmInfo}
      />
    </div>
  );
}

function getEducationInputs(thisEd, userData, setUserData, setFocusElmInfo) {
  return (
    <div className="education-inputs">
      {getEducationInputs_topLines(thisEd, userData, setUserData)}
      {getEducationInputs_listInputs(
        thisEd,
        userData,
        setUserData,
        setFocusElmInfo
      )}
    </div>
  );
}

function getEducationInputs_topLines(thisEd, userData, setUserData) {
  return (
    <div className="education-top-lines-inputs">
      <GetDataInput
        userData={userData}
        setUserData={setUserData}
        level_0_key={"education"}
        level_1_key={"school"}
        level_1_id={thisEd.id}
      />

      <div className="grad-year-line">
        <GetDataInput
          userData={userData}
          setUserData={setUserData}
          level_0_key={"education"}
          level_1_key={"gradYear"}
          level_1_id={thisEd.id}
        />
        <GetDataInput
          userData={userData}
          setUserData={setUserData}
          level_0_key={"education"}
          level_1_key={"currentStudent"}
          level_1_id={thisEd.id}
        />
      </div>

      <div className="degree-line">
        <GetDataInput
          userData={userData}
          setUserData={setUserData}
          level_0_key={"education"}
          level_1_key={"degree"}
          level_1_id={thisEd.id}
        />

        <div className="minor-or-conc-line">
          <GetDataInput
            userData={userData}
            setUserData={setUserData}
            level_0_key={"education"}
            level_1_key={"minorOrConc"}
            level_1_id={thisEd.id}
          />
          <GetDataInput
            userData={userData}
            setUserData={setUserData}
            level_0_key={"education"}
            level_1_key={"minor"}
            level_1_id={thisEd.id}
          />
          <GetDataInput
            userData={userData}
            setUserData={setUserData}
            level_0_key={"education"}
            level_1_key={"concentration"}
            level_1_id={thisEd.id}
          />
        </div>
      </div>

      <GetDataInput
        userData={userData}
        setUserData={setUserData}
        level_0_key={"education"}
        level_1_key={"location"}
        level_1_id={thisEd.id}
      />
    </div>
  );
}

function getEducationInputs_listInputs(
  thisEd,
  userData,
  setUserData,
  setFocusElmInfo
) {
  return (
    <div className="education-list-inputs">
      {getEducationInputs_gpaInputs(thisEd, userData, setUserData)}
      {getEducationInputs_listItemInput(
        thisEd,
        userData,
        setUserData,
        "awards",
        setFocusElmInfo
      )}
      {getEducationInputs_listItemInput(
        thisEd,
        userData,
        setUserData,
        "coursework",
        setFocusElmInfo
      )}
    </div>
  );
}

function getEducationInputs_gpaInputs(thisEd, userData, setUserData) {
  return (
    <div className="gpa-inputs">
      <GetDataInput
        userData={userData}
        setUserData={setUserData}
        level_0_key={"education"}
        level_1_key={"includeGPA"}
        level_1_id={thisEd.id}
      />

      {thisEd.gpa || thisEd.gpa === "" ? (
        <>
          <GetDataInput
            userData={userData}
            setUserData={setUserData}
            level_0_key={"education"}
            level_1_key={"gpa"}
            level_1_id={thisEd.id}
          />
          <GetDataInput
            userData={userData}
            setUserData={setUserData}
            level_0_key={"education"}
            level_1_key={"gpaScale"}
            level_1_id={thisEd.id}
          />
        </>
      ) : null}
    </div>
  );
}

function getEducationInputs_listItemInput(
  thisEd,
  userData,
  setUserData,
  level_1_key,
  setFocusElmInfo
) {
  return (
    <div className={`education-input-list-${level_1_key}`}>
      {level_1_key + ": "}
      <div className="list-item-inputs">
        {thisEd[level_1_key].map((listItem, index) => {
          return (
            <div
              key={`${level_1_key}[${index}]-${thisEd.id}`}
              className="list-input-and-del-btn"
            >
              <GetDataInput
                userData={userData}
                setUserData={setUserData}
                level_0_key={"education"}
                level_1_key={level_1_key}
                level_1_id={thisEd.id}
                listIndexToChange={index}
              />
              <GetDataButton
                btnType="delete"
                userData={userData}
                setUserData={setUserData}
                level_0_key={"education"}
                level_1_key={level_1_key}
                level_1_id={thisEd.id}
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
        level_0_key={"education"}
        level_1_key={level_1_key}
        level_1_id={thisEd.id}
        setFocusElmInfo={setFocusElmInfo}
      />
    </div>
  );
}
