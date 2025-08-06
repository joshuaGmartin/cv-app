export default function InfoInput_Education({
  userData,
  setUserData,
  resetData,
}) {
  return (
    <div className="InfoInput_Education">
      {userData.education.map((thisEd) => {
        return (
          <div key={thisEd.id} className="education-section">
            {getEducationInputs(thisEd, userData, setUserData)}
            <button
              className="delete-education-button"
              onClick={() =>
                setUserData({
                  ...userData,
                  education: userData.education.filter((mapEd) => {
                    if (mapEd.id !== thisEd.id) return mapEd;
                  }),
                })
              }
            >
              xxxxxxxxxxxxx
            </button>
          </div>
        );
      })}

      {/* add education button */}
      <button
        className="add-education-button"
        onClick={() =>
          setUserData({
            ...userData,
            education: [
              ...userData.education,
              {
                ...resetData.education[0],
                id: crypto.randomUUID(),
              },
            ],
          })
        }
      >
        ++++++++++++
      </button>
    </div>
  );
}

function getEducationInputs(thisEd, userData, setUserData) {
  return (
    <>
      <div className="education-top-lines-inputs">
        {/* thisEd, key, userData, setUserData, name, type */}
        {getInput(
          thisEd,
          "school",
          userData,
          setUserData,
          thisEd.school + thisEd.gradYear + "school-input",
          "text"
        )}
        <div className="grad-year-line">
          {getInput(
            thisEd,
            "gradYear",
            userData,
            setUserData,
            thisEd.school + thisEd.gradYear + "gradYear-input",
            "text"
          )}
          {getInput(
            thisEd,
            "currentStudent",
            userData,
            setUserData,
            thisEd.school + thisEd.gradYear + "currentStudent-input",
            "checkbox"
          )}
        </div>
        {getInput(
          thisEd,
          "location",
          userData,
          setUserData,
          thisEd.school + thisEd.gradYear + "location-input",
          "text"
        )}
        {getInput(
          thisEd,
          "degree",
          userData,
          setUserData,
          thisEd.school + thisEd.gradYear + "degree-input",
          "text"
        )}
        <div className="minOrSpec-line">
          {getInput(
            thisEd,
            "minorOrSpec",
            userData,
            setUserData,
            thisEd.school + thisEd.gradYear + "minorOrSpec-input",
            "text"
          )}
          {getInput(
            thisEd,
            "minor",
            userData,
            setUserData,
            thisEd.school + thisEd.gradYear + "minor-input",
            "radio"
          )}{" "}
          {getInput(
            thisEd,
            "specialization",
            userData,
            setUserData,
            thisEd.school + thisEd.gradYear + "specialization-input",
            "radio"
          )}
        </div>
      </div>

      <div className="education-list-inputs">
        {/* thisEd, key, userData, setUserData, name, type */}
        <div className="gpa-inputs">
          {getInput(
            thisEd,
            "gpa",
            userData,
            setUserData,
            thisEd.school + thisEd.gradYear + "includeGPA-input",
            "checkbox"
          )}
          {thisEd.gpa || thisEd.gpa === ""
            ? getInput(
                thisEd,
                "gpa",
                userData,
                setUserData,
                thisEd.school + thisEd.gradYear + "gpa-input",
                "text"
              )
            : null}
          {thisEd.gpa || thisEd.gpa === ""
            ? getInput(
                thisEd,
                "gpaScale",
                userData,
                setUserData,
                thisEd.school + thisEd.gradYear + "gpaScale-input",
                "text"
              )
            : null}
        </div>

        <div className="awards-input"></div>
      </div>
    </>
  );
}

function getInput(...args) {
  switch (args[5]) {
    case "text":
      return getTextInput(args);
    case "checkbox":
      return getCheckBoxInput(args);
    case "radio":
      return getRadioInputs(args);
  }
}

function getTextInput(args) {
  let [thisEd, key, userData, setUserData, inputName, type] = args;
  let value = thisEd[key];

  // handle special
  if (key === "minorOrSpec") {
    key = "minor";
    if (thisEd.minor === null) key = "specialization";
    value = thisEd[key];
  }
  if (key === "gpa" || key === "gpaScale") {
    if (value === true) value = "";
  }

  // set and format placeholders
  let placeholder = key;
  switch (key) {
    case "gradYear":
      placeholder = "graduation year";
      break;
    case "gpaScale":
      placeholder = "gpa scale";
      break;
  }

  return (
    <div>
      <input
        name={inputName}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) =>
          setUserData({
            ...userData,
            education: userData.education.map((mapEd) => {
              if (mapEd === thisEd) {
                return {
                  ...mapEd,
                  [key]: e.target.value,
                };
              } else return { ...mapEd };
            }),
          })
        }
      />
    </div>
  );
}

function getCheckBoxInput(args) {
  let [thisEd, key, userData, setUserData, inputName, type] = args;
  let checked = thisEd[key];

  let label = key;
  switch (key) {
    case "currentStudent":
      label = "current student";
      break;
    case "gpa":
      label = "include GPA";
      if (thisEd.gpa === "") checked = true; // empty string is false in boolean
      break;
  }

  return (
    <label htmlFor={inputName}>
      {label}?:{" "}
      <input
        id={inputName}
        name={inputName}
        type={type}
        checked={checked} // thisEd[key] || thisEd.gpa === "" ???
        onChange={() =>
          setUserData({
            ...userData,
            education: userData.education.map((mapEd) => {
              if (mapEd === thisEd) {
                return {
                  ...mapEd,
                  [key]: !thisEd[key],
                  gpaScale: key === "gpa" ? !thisEd.gpaScale : thisEd.gpaScale, // could make condition to save GPA in dataBase
                };
              } else return { ...mapEd };
            }),
          })
        }
      />
    </label>
  );
}

function getRadioInputs(args) {
  let [thisEd, key, userData, setUserData, inputName, type] = args;
  let otherKey = "minor";
  if (key === "minor") otherKey = "specialization";

  return (
    <label htmlFor={inputName}>
      {key}:{" "}
      <input
        type={type}
        id={inputName}
        name={inputName}
        value={key}
        checked={thisEd[key] !== null}
        onChange={() =>
          setUserData({
            ...userData,
            education: userData.education.map((mapEd) => {
              if (mapEd === thisEd) {
                return {
                  ...mapEd,
                  [key]: thisEd[otherKey],
                  [otherKey]: null,
                };
              } else return { ...mapEd };
            }),
          })
        }
      />
    </label>
  );
}
