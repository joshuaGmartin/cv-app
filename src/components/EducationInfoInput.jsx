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
    </>
  );
}

// function MinorSpecInput(thisEd, userData, setUserData) {
//   // console.log("==========================");
//   // console.log(thisEd.school);
//   // console.log("thisEd.minor");
//   // console.log(thisEd.minor);
//   // console.log("thisEd.specialization");
//   // console.log(thisEd.specialization);
//   // console.log("==========================");

//   let textKey = "minor";
//   if (thisEd[textKey] === null) textKey = "specialization";

//   return (
//     <>
//       {GetTextInput(
//         thisEd,
//         textKey,
//         userData,
//         setUserData,
//         thisEd.school + thisEd.gradYear + "minorOrSpec"
//       )}
//       minor:{" "}

//     </>
//   );
// }

// function GetInput(thisEd, key, userData, setUserData, name, type) {
function GetInput(...args) {
  switch (args[5]) {
    case "text":
      // return GetTextInput(args.slice(0, -1));
      return GetTextInput(args);
    case "checkbox":
      return GetCheckBoxInput(args);
    case "radio":
      return GetRadioInputs(args);
  }
}

function GetTextInput(args) {
  let [thisEd, key, userData, setUserData, inputName, type] = args;

  // handle special
  if (key === "minorOrSpec") {
    key = "minor";
    if (thisEd.minor === null) key = "specialization";
  }

  // set and format placeholders
  let placeholder = key;
  switch (key) {
    case "gradYear":
      placeholder = "graduation year";
  }

  return (
    <div>
      <input
        name={inputName}
        type={type}
        placeholder={placeholder}
        value={thisEd[key]}
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

  let label = key;
  switch (key) {
    case "currentStudent":
      label = "current student";
  }

  return (
    <div>
      <span>{label}?: </span>
      <input
        name={inputName}
        type={type}
        checked={thisEd[key]}
        onChange={() =>
          setUserData({
            ...userData,
            education: userData.education.map((mapEd) => {
              if (mapEd === thisEd) {
                return {
                  ...mapEd,
                  [key]: !thisEd[key],
                };
              } else return { ...mapEd };
            }),
          })
        }
      />
    </div>
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
