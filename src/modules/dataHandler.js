/* 
parameter template:
*/

export function changeData({
  e = null,
  userData = null,
  setUserData = null,
  level_0_key = null,
  // level_0_id = null,
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
    // level_0_id,
    level_0_key,
    level_1_id,
    level_1_key,
    level_2_id,
    level_2_key,
    listIndexToChange,
  };

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
      console.error(args.level_0_key + "does not exist");
      return;
  }
}

function changePersonalData(args) {
  change_level_0_textData(args);
  return;
}

function changeEducationData(args) {
  // qualifiers
  const booleanKeys = [
    "currentStudent",
    "minor",
    "specialization",
    "gpa",
    "gpaScale",
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
