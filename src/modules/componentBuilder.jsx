export function getTextInput(thisEd, key, userData, setUserData, inputName) {
  // let [thisEd, key, userData, setUserData, inputName, type] = args;
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
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) =>
          setUserData({
            ...userData,
            education: userData.education.map((mapEd) => {
              if (mapEd.id === thisEd.id) {
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

//bug: dont think index will work once add delete/add awards. will need ids in database lists? - works
export function getListItemInput(
  thisEd,
  userData,
  setUserData,
  inputName,
  listItem,
  index,
  listItemtype
) {
  let placeholder;
  let key;

  switch (listItemtype) {
    case "award":
      placeholder = "award/recognition";
      key = "awards";
      break;
    case "course":
      placeholder = "course";
      key = "coursework";
      break;
  }

  return (
    <input
      name={inputName}
      type="text"
      placeholder={placeholder}
      value={listItem}
      onChange={(e) =>
        setUserData({
          ...userData,
          education: userData.education.map((mapEd) => {
            if (mapEd.id === thisEd.id) {
              return {
                ...mapEd,
                [key]: mapEd[key].map((maplistItem, mapIndex) => {
                  if (index === mapIndex) return e.target.value;
                  else return maplistItem;
                }),
              };
            } else return { ...mapEd };
          }),
        })
      }
    />
  );
}

export function getCheckBoxInput(
  thisEd,
  key,
  userData,
  setUserData,
  inputName
) {
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
        type="checkbox"
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

export function getRadioInput(thisEd, key, userData, setUserData, inputName) {
  let otherKey = "minor";
  if (key === "minor") otherKey = "specialization";

  return (
    <label htmlFor={inputName}>
      {key}:{" "}
      <input
        type="radio"
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
