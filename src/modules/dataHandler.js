import { resetData } from "./userData";

// =======================================================================================
// main function
// =======================================================================================

/*
expects:
args = {
  userData,
  setUserData,
  level_0_key,
  level_1_key,
  level_1_id,
  level_2_key,
  level_2_id,
  listIndexToChange,
  };
  */

export function changeData(args) {
  switch (args.level_0_key) {
    case "personal":
      return changePersonalData(args);
    case "education":
      return changeEducationData(args);
    case "workExperience":
      return changeWorkExperienceData(args);
    case "skillsAndInt":
      return changeSkillsAndIntData(args);
    default:
      console.error(
        args.level_0_key + " does not exist in data base as top level key"
      );
      return;
  }
}

// =======================================================================================
// secondary function
// =======================================================================================

function changePersonalData(args) {
  change_level_0_textData(args);
  return;
}

function changeEducationData(args) {
  // qualifiers
  const booleanKeys = [
    "currentStudent",
    "minor",
    "concentration",
    "includeGPA",
  ];
  const listKeys = ["awards", "coursework"];

  // handle boolean inputs
  if (booleanKeys.includes(args.level_1_key)) {
    return change_level_1_booleanData(args);
  }

  // handle list inputs
  else if (listKeys.includes(args.level_1_key)) {
    return change_level_1_listData(args);
  }

  // else handle text inputs
  else {
    return change_level_1_textData(args);
  }
}

function changeWorkExperienceData(args) {
  // qualifiers
  const level_2_textKeys = ["position", "timeStart", "timeEnd", "location"];
  const level_2_listKeys = ["duties", "stack", "keyResults"];

  // handle level 2 text inputs
  if (args.level_2_key && level_2_textKeys.includes(args.level_2_key)) {
    return change_level_2_textData(args);
  }

  // handle level 2 list inputs
  else if (args.level_2_key && level_2_listKeys.includes(args.level_2_key)) {
    return change_level_2_listData(args);
  }

  // else handle level 1 text inputs
  else {
    return change_level_1_textData(args);
  }
}

function changeSkillsAndIntData(args) {
  return change_level_0_listData(args);
}

// =======================================================================================
// helper functions
// =======================================================================================

// ====================== level 0 ======================

function change_level_0_textData(args) {
  let changeValue = args.e.target.value;

  // handle special
  if (args.level_0_key === "personal" && args.level_1_key === "portfolioLink") {
    changeValue = "https://" + changeValue;
  }

  args.setUserData({
    ...args.userData,
    [args.level_0_key]: {
      ...args.userData[args.level_0_key],
      [args.level_1_key]: changeValue,
    },
  });

  return;
}

function change_level_0_listData(args) {
  args.setUserData({
    ...args.userData,
    [args.level_0_key]: {
      ...args.userData[args.level_0_key],
      [args.level_1_key]: args.userData[args.level_0_key][args.level_1_key].map(
        (listItemMap, index) => {
          if (args.listIndexToChange === index) {
            return args.e.target.value;
          } else return listItemMap;
        }
      ),
    },
  });

  return;
}

// ====================== level 1 ======================

function change_level_1_textData(args) {
  const thisEd = args.userData.education.find(
    (thisEdMap) => thisEdMap.id === args.level_1_id
  );

  switch (args.level_0_key) {
    case "education":
      switch (args.level_1_key) {
        case "minorOrConc":
          args.level_1_key = "minor"; // auto assign key to minor and then check for concentration
          if (!thisEd.minor) {
            args.level_1_key = "concentration";
          }
          break;
      }
      break;
  }

  args.setUserData({
    ...args.userData,
    [args.level_0_key]: args.userData[args.level_0_key].map((level_1_map) => {
      if (level_1_map.id === args.level_1_id) {
        return {
          ...level_1_map,
          [args.level_1_key]: args.e.target.value,
        };
      } else return level_1_map;
    }),
  });

  return;
}

function change_level_1_booleanData(args) {
  // handle special: ed include GPA
  if (args.level_0_key === "education" && args.level_1_key === "includeGPA") {
    args.setUserData({
      ...args.userData,
      education: args.userData.education.map((thisEdMap) => {
        if (thisEdMap.id === args.level_1_id) {
          // empty strings count as false
          return {
            ...thisEdMap,
            gpa: thisEdMap.gpa || thisEdMap.gpa === "" ? false : "",
            gpaScale:
              thisEdMap.gpaScale || thisEdMap.gpaScale === "" ? false : "",
          };
        } else return thisEdMap;
      }),
    });
  }

  // handle special: ed minor or spec select
  else if (
    args.level_0_key === "education" &&
    (args.level_1_key === "minor" || args.level_1_key === "concentration")
  ) {
    let newChoiceKey = "minor";
    let oldChoiceKey = "concentration";

    if (args.level_1_key === "concentration") {
      newChoiceKey = "concentration";
      oldChoiceKey = "minor";
    }

    args.setUserData({
      ...args.userData,
      education: args.userData.education.map((thisEdMap) => {
        if (thisEdMap.id === args.level_1_id) {
          return {
            ...thisEdMap,
            [newChoiceKey]: thisEdMap[oldChoiceKey], // new choice (other) key becomes the old value
            [oldChoiceKey]: false, // old choice becomes false
          };
        } else return thisEdMap;
      }),
    });
  }

  //default
  else {
    args.setUserData({
      ...args.userData,
      [args.level_0_key]: args.userData[args.level_0_key].map((level_1_map) => {
        if (level_1_map.id === args.level_1_id) {
          return {
            ...level_1_map,
            [args.level_1_key]: !level_1_map[args.level_1_key],
          };
        } else return level_1_map;
      }),
    });
  }

  return;
}

function change_level_1_listData(args) {
  // handle delete
  if (args.btnType === "delete") {
    args.setUserData({
      ...args.userData,
      [args.level_0_key]: args.userData[args.level_0_key].map((level_1_map) => {
        if (level_1_map.id === args.level_1_id) {
          return {
            ...level_1_map,
            [args.level_1_key]: level_1_map[args.level_1_key].filter(
              (_, filterIndex) => args.listIndexToChange !== filterIndex
            ),
          };
        } else return level_1_map;
      }),
    });

    return;
  }

  // handle add
  else if (args.btnType === "add") {
    args.setUserData({
      ...args.userData,
      [args.level_0_key]: args.userData[args.level_0_key].map((level_1_map) => {
        if (level_1_map.id === args.level_1_id) {
          return {
            ...level_1_map,
            [args.level_1_key]: [
              ...level_1_map[args.level_1_key],
              resetData[args.level_0_key][0][args.level_1_key],
            ],
          };
        } else return level_1_map;
      }),
    });

    return;
  }

  //handle all other
  else {
    args.setUserData({
      ...args.userData,
      [args.level_0_key]: args.userData[args.level_0_key].map((level_1_map) => {
        if (level_1_map.id === args.level_1_id) {
          return {
            ...level_1_map,
            [args.level_1_key]: level_1_map[args.level_1_key].map(
              (listItemMap, index) => {
                if (index === args.listIndexToChange) {
                  return args.e.target.value;
                } else return listItemMap;
              }
            ),
          };
        } else return level_1_map;
      }),
    });

    return;
  }
}

// ====================== level 2 ======================

function change_level_2_textData(args) {
  args.setUserData({
    ...args.userData,
    [args.level_0_key]: args.userData[args.level_0_key].map((level_1_map) => {
      if (level_1_map.id === args.level_1_id) {
        return {
          ...level_1_map,
          [args.level_1_key]: level_1_map[args.level_1_key].map(
            (level_2_map) => {
              if (level_2_map.id === args.level_2_id) {
                return {
                  ...level_2_map,
                  [args.level_2_key]: args.e.target.value,
                };
              } else return level_2_map;
            }
          ),
        };
      } else return level_1_map;
    }),
  });

  return;
}

function change_level_2_listData(args) {
  args.setUserData({
    ...args.userData,
    [args.level_0_key]: args.userData[args.level_0_key].map((level_1_map) => {
      if (level_1_map.id === args.level_1_id) {
        return {
          ...level_1_map,
          [args.level_1_key]: level_1_map[args.level_1_key].map(
            (level_2_map) => {
              if (level_2_map.id === args.level_2_id) {
                return {
                  ...level_2_map,
                  [args.level_2_key]: level_2_map[args.level_2_key].map(
                    (listItemMap, index) => {
                      if (args.listIndexToChange === index) {
                        return args.e.target.value;
                      } else return listItemMap;
                    }
                  ),
                };
              } else return level_2_map;
            }
          ),
        };
      } else return level_1_map;
    }),
  });

  return;
}
