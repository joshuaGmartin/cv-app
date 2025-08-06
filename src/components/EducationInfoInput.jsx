console.clear();

export default function EducationInfoInput({ userData, setUserData }) {
  return (
    <div className="EducationInfoInput">
      {userData.education.map((thisEd) => {
        return (
          <>
            <div className="education-section">
              {getEducationInputs(thisEd, userData, setUserData)}
            </div>
          </>
        );
      })}
    </div>
  );
}

function getEducationInputs(thisEd, userData, setUserData) {
  return (
    <>
      <div className="education-top-lines-inputs">
        {/* thisEd, key, userData, setUserData, name, type */}
        {GetInput(
          thisEd,
          "school",
          userData,
          setUserData,
          thisEd.school + thisEd.gradYear + "school-input",
          "text"
        )}
        <div className="grad-year-line">
          {GetInput(
            thisEd,
            "gradYear",
            userData,
            setUserData,
            thisEd.school + thisEd.gradYear + "gradYear-input",
            "text"
          )}
          {GetInput(
            thisEd,
            "currentStudent",
            userData,
            setUserData,
            thisEd.school + thisEd.gradYear + "currentStudent-input",
            "checkbox"
          )}
        </div>
        {GetInput(
          thisEd,
          "location",
          userData,
          setUserData,
          thisEd.school + thisEd.gradYear + "location-input",
          "text"
        )}
        {GetInput(
          thisEd,
          "degree",
          userData,
          setUserData,
          thisEd.school + thisEd.gradYear + "degree-input",
          "text"
        )}
        <div className="minOrSpec-line">
          {GetInput(
            thisEd,
            "minorOrSpec",
            userData,
            setUserData,
            thisEd.school + thisEd.gradYear + "minorOrSpec-input",
            "text"
          )}
          {GetInput(
            thisEd,
            "minor",
            userData,
            setUserData,
            thisEd.school + thisEd.gradYear + "minor-input",
            "radio"
          )}{" "}
          {GetInput(
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
          {GetInput(
            thisEd,
            "gpa",
            userData,
            setUserData,
            thisEd.school + thisEd.gradYear + "includeGPA-input",
            "checkbox"
          )}
          {thisEd.gpa || thisEd.gpa === ""
            ? GetInput(
                thisEd,
                "gpa",
                userData,
                setUserData,
                thisEd.school + thisEd.gradYear + "gpa-input",
                "text"
              )
            : null}
          {thisEd.gpa || thisEd.gpa === ""
            ? GetInput(
                thisEd,
                "gpaScale",
                userData,
                setUserData,
                thisEd.school + thisEd.gradYear + "gpaScale-input",
                "text"
              )
            : null}
        </div>
      </div>
    </>
  );
}

function GetInput(...args) {
  switch (args[5]) {
    case "text":
      return GetTextInput(args);
    case "checkbox":
      return GetCheckBoxInput(args);
    case "radio":
      return GetRadioInputs(args);
  }
}

function GetTextInput(args) {
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

function GetCheckBoxInput(args) {
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

  // if (key === "currentStudent") {
  //   return (
  //     <label htmlFor={inputName}>
  //       {label}?:{" "}
  //       <input
  //         id={inputName}
  //         name={inputName}
  //         type={type}
  //         checked={checked} // thisEd[key] || thisEd.gpa === "" ???
  //         onChange={() =>
  //           setUserData({
  //             ...userData,
  //             education: userData.education.map((mapEd) => {
  //               if (mapEd === thisEd) {
  //                 return {
  //                   ...mapEd,
  //                   [key]: !thisEd[key],
  //                 };
  //               } else return { ...mapEd };
  //             }),
  //           })
  //         }
  //       />
  //     </label>
  //   );
  // }

  // // can condense to one return? check edit gpa first
  // if (key === "gpa") {
  //   return (
  //     <div>
  //       <span>{label}?: </span>
  //       <input
  //         name={inputName}
  //         type={type}
  //         checked={checked}
  //         onChange={() =>
  //           setUserData({
  //             ...userData,
  //             education: userData.education.map((mapEd) => {
  //               if (mapEd === thisEd) {
  //                 return {
  //                   ...mapEd,
  //                   [key]: !thisEd[key],
  //                   gpaScale: !thisEd.gpaScale, // make ternany?
  //                 };
  //               } else return { ...mapEd };
  //             }),
  //           })
  //         }
  //       />
  //     </div>
  //   );
  // }
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

function GetRadioInputs(args) {
  let [thisEd, key, userData, setUserData, inputName, type] = args;
  let otherKey = "minor";
  if (key === "minor") otherKey = "specialization";

  // console.log([thisEd, key, userData, setUserData, inputName, type]);

  return (
    <>
      {key}:{" "}
      <input
        type={type}
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
    </>
  );
}
