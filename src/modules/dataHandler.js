import { resetData } from "./userData";

// =======================================================================================
// main functions
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
  //handle add/delete
  if (args.btnType) {
    //handle error
    const btnTypes = ["add", "delete"];

    if (!btnTypes.includes(args.btnType))
      console.error("Button type does not exist.");

    switch (args.level_0_key) {
      case "personal":
        return;
      case "education":
        return addDelEducationData(args);
      case "workExperience":
        return addDelWorkExperienceData(args);
      case "skillsAndInt":
        return addDelSkillsAndIntData(args);
      default:
        console.error(
          args.level_0_key + " does not exist in data base as top level key"
        );
        return;
    }
  }

  // handle inputs
  else {
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
}

// =======================================================================================
// secondary functions
// =======================================================================================

// ----------------------------------------------
// inputs
// ----------------------------------------------

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

// ----------------------------------------------
// add/delete
// ----------------------------------------------

function addDelEducationData(args) {
  switch (args.btnType) {
    case "delete":
      if (args.level_1_key) return deleteIn_level_1(args);
      else return deleteIn_level_0(args);
    case "add":
      if (args.level_1_key) return addIn_level_1(args);
      else return addIn_level_0(args);
  }

  return;
}

function addDelWorkExperienceData(args) {
  switch (args.btnType) {
    case "delete":
      if (args.level_2_key) return deleteIn_level_2(args);
      else if (args.level_1_key) return deleteIn_level_1(args);
      else return deleteIn_level_0(args);
    case "add":
      if (args.level_2_key) return addIn_level_2(args);
      if (args.level_1_key) return addIn_level_1(args);
      else return addIn_level_0(args);
  }

  return;
}

function addDelSkillsAndIntData(args) {
  switch (args.btnType) {
    case "delete":
      return deleteIn_level_0(args);
    case "add":
      return addIn_level_0(args);
  }
}

// =======================================================================================
// helper functions
// =======================================================================================

// ----------------------------------------------
// inputs
// ----------------------------------------------

// ************** level 0 **************

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

// ************** level 1 **************

function change_level_1_textData(args) {
  const thisEd = args.userData.education.find(
    (thisEdMap) => thisEdMap.id === args.level_1_id
  );

  switch (args.level_0_key) {
    case "education":
      switch (args.level_1_key) {
        case "minorOrConc":
          args.level_1_key = "minor"; // auto assign key to minor and then check for concentration
          // empty string is boolean false
          if (!thisEd.minor && thisEd.minor !== "") {
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

// ************** level 2 **************

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

// ----------------------------------------------
// add/delete
// ----------------------------------------------

// ************** level 0 **************

function deleteIn_level_0(args) {
  // handle delete in skillsAndInt list
  if (args.level_0_key === "skillsAndInt") {
    args.setUserData({
      ...args.userData,
      [args.level_0_key]: {
        ...args.userData[args.level_0_key],
        [args.level_1_key]: args.userData[args.level_0_key][
          args.level_1_key
        ].filter((_, filterIndex) => args.listIndexToChange !== filterIndex),
      },
    });
  }

  // default
  else {
    args.setUserData({
      ...args.userData,
      [args.level_0_key]: args.userData[args.level_0_key].filter(
        (level_1_map) => level_1_map.id !== args.level_1_id
      ),
    });
  }

  return;
}

function addIn_level_0(args) {
  // handle add in skillsAndInt list
  if (args.level_0_key === "skillsAndInt") {
    args.setUserData({
      ...args.userData,
      [args.level_0_key]: {
        ...args.userData[args.level_0_key],
        [args.level_1_key]: [
          ...args.userData[args.level_0_key][args.level_1_key],
          "",
        ],
      },
    });
  }

  // handle add workEx (with job)
  else if (args.level_0_key === "workExperience") {
    args.setUserData({
      ...args.userData,
      workExperience: [
        ...args.userData.workExperience,
        {
          ...resetData.workExperience[0],
          id: crypto.randomUUID(),
          jobsInfo: [
            {
              ...resetData.workExperience[0].jobsInfo[0],
              id: crypto.randomUUID(),
            },
          ],
        },
      ],
    });
  }

  // default
  else {
    args.setUserData({
      ...args.userData,
      [args.level_0_key]: [
        ...args.userData[args.level_0_key],
        {
          ...resetData[args.level_0_key][0],
          id: crypto.randomUUID(),
        },
      ],
    });
  }

  return;
}

// ************** level 1 **************

function deleteIn_level_1(args) {
  // handle del job section
  if (args.level_1_key === "jobsInfo" && !args.level_2_key) {
    args.setUserData({
      ...args.userData,
      [args.level_0_key]: args.userData[args.level_0_key].map((level_1_map) => {
        if (level_1_map.id === args.level_1_id) {
          return {
            ...level_1_map,
            [args.level_1_key]: level_1_map[args.level_1_key].filter(
              (level_2_map) => args.level_2_id !== level_2_map.id
            ),
          };
        } else return level_1_map;
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
            [args.level_1_key]: level_1_map[args.level_1_key].filter(
              (_, filterIndex) => args.listIndexToChange !== filterIndex
            ),
          };
        } else return level_1_map;
      }),
    });
  }

  return;
}

function addIn_level_1(args) {
  // handle add job in workEx
  if (
    args.level_0_key === "workExperience" &&
    args.level_1_key === "jobsInfo"
  ) {
    args.setUserData({
      ...args.userData,
      [args.level_0_key]: args.userData[args.level_0_key].map((level_1_map) => {
        if (level_1_map.id === args.level_1_id) {
          return {
            ...level_1_map,
            jobsInfo: [
              ...level_1_map.jobsInfo,
              {
                ...resetData.workExperience[0].jobsInfo[0],
                id: crypto.randomUUID(),
              },
            ],
          };
        } else return level_1_map;
      }),
    });
  }

  // default
  else {
    args.setUserData({
      ...args.userData,
      [args.level_0_key]: args.userData[args.level_0_key].map((level_1_map) => {
        if (level_1_map.id === args.level_1_id) {
          return {
            ...level_1_map,
            [args.level_1_key]: [...level_1_map[args.level_1_key], ""],
          };
        } else return level_1_map;
      }),
    });
  }

  return;
}

// ************** level 2 **************

function deleteIn_level_2(args) {
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
                  [args.level_2_key]: level_2_map[args.level_2_key].filter(
                    (_, filterIndex) => args.listIndexToChange !== filterIndex
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

function addIn_level_2(args) {
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
                  [args.level_2_key]: [...level_2_map[args.level_2_key], ""],
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
