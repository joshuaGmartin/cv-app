import { changeData } from "./dataHandler.js";

// =======================================================================================
// main function
// =======================================================================================
export function GetDataInput({
  e = null,
  userData = null,
  setUserData = null,
  level_0_key = null,
  level_1_key = null,
  level_1_id = null,
  level_2_key = null,
  level_2_id = null,
  listIndexToChange = null,
}) {
  const args = {
    e,
    userData,
    setUserData,
    level_0_key,
    level_1_id,
    level_1_key,
    level_2_id,
    level_2_key,
    listIndexToChange,
  };

  switch (args.level_0_key) {
    case "personal":
      return getPersonalInput(args);
    case "education":
      return getEducationInput(args);
    case "workExperience":
      return getWorkExperienceInput(args);
    case "skillsAndInt":
      return getSkillsAndIntInput(args);
    default:
      console.error(
        args.level_0_key + " does not exist in data base as top level key"
      );
      return;
  }
}

// =======================================================================================
// secondary functions
// =======================================================================================

function getPersonalInput(args) {
  return get_level_0_textInput(args);
}

function getEducationInput(args) {
  const thisEd = args.userData.education.find(
    (thisEdMap) => thisEdMap.id === args.level_1_id
  );

  // qualifiers
  const checkboxKeys = ["currentStudent", "includeGPA"];
  const radioKeys = ["minor", "concentration"];
  const listKeys = ["awards", "coursework"];

  // handle checkbox inputs
  if (checkboxKeys.includes(args.level_1_key)) {
    return get_level_1_checkboxInput(args, thisEd);
  }

  // handle radio inputs
  else if (radioKeys.includes(args.level_1_key)) {
    return get_level_1_radioInput(args, thisEd);
  }

  // handle list inputs
  else if (listKeys.includes(args.level_1_key)) {
    return get_level_1_listItemInput(args, thisEd);
  }

  // handle text other inputs
  else return get_level_1_textInput(args, thisEd);
}

function getWorkExperienceInput(args) {
  const thisWorkEx = args.userData.workExperience.find(
    (thisWorkExMap) => thisWorkExMap.id === args.level_1_id
  );

  // qualifiers
  const listKeys = ["duties", "stack", "keyResults"];

  // handle level_2
  if (args.level_2_key) {
    // handle level_2 list inputs
    if (listKeys.includes(args.level_2_key)) {
      return get_level_2_listItemInput(args, thisWorkEx);
    }

    // handle level_2 other text inputs
    else return get_level_2_textInput(args, thisWorkEx);
  }

  // handle level_1
  else return get_level_1_textInput(args, thisWorkEx);
}

function getSkillsAndIntInput(args) {
  return get_level_0_listInput(args);
}

// =======================================================================================
// helper functions
// =======================================================================================

//temp fix
export function getTextInput(args) {
  return; // NOT THIS ONE
}

// ====================== level 0 ======================

function get_level_0_textInput(args) {
  return (
    <div>
      <input
        type="text"
        placeholder={args.level_1_key}
        value={args.userData[args.level_0_key][args.level_1_key]}
        onChange={(e) =>
          changeData({
            ...args,
            e: e,
          })
        }
      />
    </div>
  );
}

function get_level_0_listInput(args) {
  let placeholder = args.level_1_key;

  switch (args.level_1_key) {
    case "hardSkillsTech":
    case "hardSkillsOther":
    case "softSkills":
      placeholder = "skill";
      break;
    case "interests":
      placeholder = "interest";
  }

  return (
    <div>
      <input
        type="text"
        placeholder={placeholder}
        value={
          args.userData[args.level_0_key][args.level_1_key][
            args.listIndexToChange
          ]
        }
        onChange={(e) =>
          changeData({
            ...args,
            e: e,
          })
        }
      />
    </div>
  );
}

// ====================== level 1 ======================

function get_level_1_textInput(args, this_level_1) {
  let inputValue;
  let placeholder;
  let temp_level_1_key;

  // handle special
  switch (args.level_0_key) {
    case "education":
      switch (args.level_1_key) {
        case "minorOrSpec":
          temp_level_1_key = "minor"; // auto assign key to minor and then check for concentration
          if (!this_level_1.minor) {
            temp_level_1_key = "concentration";
          }
          inputValue = this_level_1[temp_level_1_key];
          break;

        case "gpa":
        case "gpaScale":
          if (inputValue === true) inputValue = "";
          break;
        default:
          inputValue = this_level_1[args.level_1_key];
      }
      break;

    default:
      inputValue = this_level_1[args.level_1_key];
  }

  // handle placeholders
  switch (args.level_0_key) {
    case "education":
      switch (args.level_1_key) {
        case "gradYear":
          placeholder = "graduation year";
          break;
        case "gpaScale":
          placeholder = "gpa scale";
          break;
        default:
          placeholder = args.level_1_key;
      }
      break;

    case "workExperience":
      switch (args.level_1_key) {
        case "totalTimeStart":
          placeholder = "when started?";
          break;
        case "totalTimeEnd":
          placeholder = "when ended?";
          break;
        default:
          placeholder = args.level_1_key;
      }
      break;

    default:
      placeholder = args.level_1_key;
  }

  return (
    <div>
      <input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) =>
          changeData({
            ...args,
            e: e,
          })
        }
      />
    </div>
  );
}

function get_level_1_radioInput(args, this_level_1) {
  let name = null;

  if (
    args.level_0_key === "education" &&
    (args.level_1_key === "minor" || args.level_1_key === "concentration")
  ) {
    name = args.level_1_id.id + "-minorSpec-selection";
  }

  // error handle
  if (!name) console.error("Radio inputs must have name");

  return (
    <div>
      <label htmlFor={this_level_1.id + "-" + args.level_1_key}>
        {args.level_1_key + ": "}
        <input
          id={this_level_1.id + "-" + args.level_1_key}
          name={name}
          type="radio"
          checked={this_level_1[args.level_1_key]}
          onChange={(e) =>
            changeData({
              ...args,
              e: e,
            })
          }
        />
      </label>
    </div>
  );
}

function get_level_1_checkboxInput(args, this_level_1) {
  let label = args.level_1_key;
  let checked = this_level_1[args.level_1_key];

  switch (args.level_1_key) {
    case "currentStudent":
      label = "current student";
      break;

    case "includeGPA":
      label = "include GPA";
      // empty strings count as false
      checked = this_level_1.gpa || this_level_1.gpa === "" ? true : false;
      break;
  }

  return (
    <div>
      <label htmlFor={this_level_1.id + "-" + args.level_1_key}>
        {label + "?: "}
        <input
          id={this_level_1.id + "-" + args.level_1_key}
          type="checkbox"
          checked={checked}
          onChange={(e) =>
            changeData({
              ...args,
              e: e,
            })
          }
        />
      </label>
    </div>
  );
}

function get_level_1_listItemInput(args, this_level_1) {
  return (
    <div>
      <input
        type="text"
        placeholder={args.level_1_key}
        value={this_level_1[args.level_1_key][args.listIndexToChange]}
        onChange={(e) =>
          changeData({
            ...args,
            e: e,
          })
        }
      />
    </div>
  );
}

// ====================== level 2 ======================

function get_level_2_textInput(args, this_level_1) {
  const this_level_2 = this_level_1[args.level_1_key].find(
    (this_level_2_map) => this_level_2_map.id === args.level_2_id
  );

  return (
    <div>
      <input
        type="text"
        placeholder={args.level_2_key}
        value={this_level_2[args.level_2_key]}
        onChange={(e) =>
          changeData({
            ...args,
            e: e,
          })
        }
      />
    </div>
  );
}

function get_level_2_listItemInput(args, this_level_1) {
  const this_level_2 = this_level_1[args.level_1_key].find(
    (this_level_2_map) => this_level_2_map.id === args.level_2_id
  );

  return (
    <div>
      <textarea
        type="text"
        placeholder={args.level_2_key}
        value={this_level_2[args.level_2_key][args.listIndexToChange]}
        onChange={(e) =>
          changeData({
            ...args,
            e: e,
          })
        }
      />
    </div>
  );
}

// OLD ========================================================================================

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
  if (key === "minor") otherKey = "concentration";

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
        })
      }
    >
      ++++++++++++
    </button>
  );
}
