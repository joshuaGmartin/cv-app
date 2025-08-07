// =========================================================================
// unnested updaters
// =========================================================================

export function getTextInput(
  thisListItem,
  key,
  userData,
  setUserData,
  inputName,
  dataType
) {
  let value = thisListItem[key];

  // handle special
  if (key === "minorOrSpec") {
    key = "minor";
    if (thisListItem.minor === null) key = "specialization";
    value = thisListItem[key];
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
    case "totalTimeStart":
      placeholder = "when started?";
      break;
    case "totalTimeEnd":
      placeholder = "when ended?";
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
            [dataType]: userData[dataType].map((thisMap) => {
              if (thisMap.id === thisListItem.id) {
                return {
                  ...thisMap,
                  [key]: e.target.value,
                };
              } else return { ...thisMap };
            }),
          })
        }
      />
    </div>
  );
}

export function getListItemInput(
  thisListItem,
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
            if (mapEd.id === thisListItem.id) {
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
  thisListItem,
  key,
  userData,
  setUserData,
  inputName
) {
  let checked = thisListItem[key];

  let label = key;
  switch (key) {
    case "currentStudent":
      label = "current student";
      break;
    case "gpa":
      label = "include GPA";
      if (thisListItem.gpa === "") checked = true; // empty string is false in boolean
      break;
  }

  return (
    <label htmlFor={inputName}>
      {label}?:{" "}
      <input
        id={inputName}
        name={inputName}
        type="checkbox"
        checked={checked} // thisListItem[key] || thisListItem.gpa === "" ???
        onChange={() =>
          setUserData({
            ...userData,
            education: userData.education.map((mapEd) => {
              if (mapEd === thisListItem) {
                return {
                  ...mapEd,
                  [key]: !thisListItem[key],
                  gpaScale:
                    key === "gpa"
                      ? !thisListItem.gpaScale
                      : thisListItem.gpaScale, // could make condition to save GPA in dataBase
                };
              } else return { ...mapEd };
            }),
          })
        }
      />
    </label>
  );
}

export function getRadioInput(
  thisListItem,
  key,
  userData,
  setUserData,
  inputName
) {
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
        checked={thisListItem[key] !== null}
        onChange={() =>
          setUserData({
            ...userData,
            education: userData.education.map((mapEd) => {
              if (mapEd === thisListItem) {
                return {
                  ...mapEd,
                  [key]: thisListItem[otherKey],
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

export function getAddSectionButton(
  userData,
  setUserData,
  resetData,
  sectionType
) {
  return (
    <button
      className={`add-${sectionType}-button`}
      onClick={() =>
        setUserData({
          ...userData,
          [sectionType]: [
            ...userData[sectionType],
            {
              ...resetData[sectionType][0],
              id: crypto.randomUUID(),
            },
          ],
        })
      }
    >
      ++++++++++++
    </button>
  );
}

// =========================================================================
// nested updaters
// =========================================================================

export function getTextInput_nested1(
  userData,
  setUserData,
  thisSection_top,
  thisSection_top_key,
  thisSection_nested,
  thisSection_nested_key,
  keyToChange,
  inputName
) {
  let value = thisSection_nested[keyToChange];

  // set and format placeholders
  let placeholder = keyToChange;
  switch (keyToChange) {
    //test
    case "timeStart":
      placeholder = "when start position?";
      break;
    case "timeEnd":
      placeholder = "when end position?";
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
            [thisSection_top_key]: userData[thisSection_top_key].map(
              (topSectionMap) => {
                if (topSectionMap.id === thisSection_top.id) {
                  return {
                    ...topSectionMap,
                    [thisSection_nested_key]: topSectionMap[
                      thisSection_nested_key
                    ].map((nestedSectionMap) => {
                      if (nestedSectionMap.id === thisSection_nested.id) {
                        return {
                          ...nestedSectionMap,
                          [keyToChange]: e.target.value,
                        };
                      } else return nestedSectionMap;
                    }),
                  };
                } else return topSectionMap;
              }
            ),
          })
        }
      />
    </div>
  );
}

export function getAddSectionButton_nested1(
  userData,
  setUserData,
  thisSection_top,
  thisSection_top_key,
  thisSection_nested_key,
  resetData
) {
  return (
    <button
      className={`add-${thisSection_nested_key}-button`} //need formatting
      onClick={() =>
        setUserData({
          ...userData,
          [thisSection_top_key]: userData[thisSection_top_key].map(
            (topSectionMap) => {
              if (topSectionMap.id === thisSection_top.id) {
                return {
                  ...topSectionMap,
                  [thisSection_nested_key]: [
                    ...topSectionMap[thisSection_nested_key],
                    resetData[thisSection_top_key][0][
                      thisSection_nested_key
                    ][0],
                  ],
                };
              }
              return topSectionMap;
            }
          ),

          // [
          //   ...userData[thisSection_top_key],
          //   {
          //     ...resetData[thisSection_top_key][0],
          //     id: crypto.randomUUID(),
          //   },
          // ],
        })
      }
    >
      ++++++++++++
    </button>
  );
}
