import { changeData } from "./dataHandler.js";

/* 
templates:

<GetDataInput
  userData={userData}
  setUserData={setUserData}
  level_0_key={""}
  level_1_key={""}
  level_1_id={}
  level_2_key={""}
  level_2_id={}
  listIndexToChange={""}
/>

<GetDataButton
  btnType={""}
  userData={userData}
  setUserData={setUserData}
  level_0_key={""}
  level_1_key={""}
  level_1_id={}
  level_2_key={""}
  level_2_id={}
  listIndexToChange={""}
  setFocusElmInfo={setFocusElmInfo}
/>

*/

// ======================================================================================
// main functions
// ======================================================================================

// ----------------------------------------------
// inputs
// ----------------------------------------------

export function GetDataInput({
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

// ----------------------------------------------
// buttons
// ----------------------------------------------

export function GetDataButton({
  btnType = null,
  userData = null,
  setUserData = null,
  level_0_key = null,
  level_1_key = null,
  level_1_id = null,
  level_2_key = null,
  level_2_id = null,
  listIndexToChange = null,
  setFocusElmInfo = null,
}) {
  const args = {
    btnType,
    userData,
    setUserData,
    level_0_key,
    level_1_key,
    level_1_id,
    level_2_key,
    level_2_id,
    listIndexToChange,
    setFocusElmInfo,
  };

  switch (btnType) {
    case "delete":
      return getDeleteButton(args);
    case "add":
      return getAddButton(args);
    default:
      console.error("Button type doesn't not exist");
      return;
  }
}

// =======================================================================================
// secondary functions
// =======================================================================================

// ----------------------------------------------
// inputs
// ----------------------------------------------

function getPersonalInput(args) {
  return get_level_0_textInput(args);
}

function getEducationInput(args) {
  const thisEd = get_this_level_1(args);

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

// ----------------------------------------------
// buttons
// ----------------------------------------------

function getDeleteButton(args) {
  // handle delete level 2 object
  if (args.level_2_key) {
    return get_level_2_deleteButton(args);
  }

  // handle delete level 1 object
  else if (args.level_1_key) {
    return get_level_1_deleteButton(args);
  }

  // else handle delete level 0 object
  else {
    return get_level_0_deleteButton(args);
  }
}

function getAddButton(args) {
  // handle add level 2 object
  if (args.level_2_key) {
    return get_level_2_addButton(args);
  }

  // else handle add level 1 object
  else if (args.level_1_key) {
    return get_level_1_addButton(args);
  }

  // else handle add level 0 object
  else {
    return get_level_0_addButton(args);
  }
}

// =======================================================================================
// helper functions
// =======================================================================================

// ----------------------------------------------
// inputs
// ----------------------------------------------

// ************** level 0 **************

function get_level_0_textInput(args) {
  let inputValue = args.userData[args.level_0_key][args.level_1_key];

  // handle special
  if (args.level_1_key === "portfolioLink") inputValue = inputValue.slice(8);

  return (
    <input
      type="text"
      placeholder={args.level_1_key}
      value={inputValue}
      onChange={(e) =>
        changeData({
          ...args,
          e: e,
        })
      }
    />
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
  );
}

// ************** level 1 **************

function get_level_1_textInput(args, this_level_1) {
  let inputValue;
  let placeholder;
  let temp_level_1_key;

  // handle special
  switch (args.level_0_key) {
    case "education":
      switch (args.level_1_key) {
        case "minorOrConc":
          temp_level_1_key = "minor"; // auto assign key to minor and then check for concentration
          if (!this_level_1.minor && this_level_1.minor !== "") {
            // empty string is false in boolean
            temp_level_1_key = "concentration";
          }
          inputValue = this_level_1[temp_level_1_key];
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
        case "minorOrConc":
          placeholder = "minor/concentration";
          break;
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
  );
}

function get_level_1_radioInput(args, this_level_1) {
  let name = null;

  if (
    args.level_0_key === "education" &&
    (args.level_1_key === "minor" || args.level_1_key === "concentration")
  ) {
    name = this_level_1.id + "-minorOrConc-selection";
  }

  // error handle
  if (!name) console.error("Radio inputs must have name");

  return (
    <label htmlFor={this_level_1.id + "-" + args.level_1_key}>
      {args.level_1_key + ": "}
      <input
        id={this_level_1.id + "-" + args.level_1_key}
        name={name}
        type="radio"
        checked={
          this_level_1[args.level_1_key] ||
          this_level_1[args.level_1_key] === ""
        }
        onChange={(e) =>
          changeData({
            ...args,
            e: e,
          })
        }
      />
    </label>
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
    <label htmlFor={this_level_1.id + "-" + args.level_1_key}>
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
      {" " + label}
    </label>
  );
}

function get_level_1_listItemInput(args, this_level_1) {
  let placeholder = args.level_1_key;

  switch (args.level_1_key) {
    case "coursework":
      placeholder = "course";
      break;
    case "awards":
      placeholder = "award";
      break;
  }

  return (
    <input
      type="text"
      placeholder={placeholder}
      value={this_level_1[args.level_1_key][args.listIndexToChange]}
      onChange={(e) =>
        changeData({
          ...args,
          e: e,
        })
      }
    />
  );
}

// ************** level 2 **************

function get_level_2_textInput(args, this_level_1) {
  const this_level_2 = get_this_level_2(args, this_level_1);

  return (
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
  );
}

function get_level_2_listItemInput(args, this_level_1) {
  const this_level_2 = get_this_level_2(args, this_level_1);
  let placeholder = args.level_2_key;

  switch (args.level_2_key) {
    case "duties":
      placeholder = "duty";
      break;
    case "keyResults":
      placeholder = "key result";
      break;
  }

  //handle textarea inputs
  if (
    args.level_0_key === "workExperience" &&
    args.level_1_key === "jobsInfo" &&
    (args.level_2_key === "duties" || args.level_2_key === "keyResults")
  ) {
    return (
      <textarea
        type="text"
        placeholder={placeholder}
        value={this_level_2[args.level_2_key][args.listIndexToChange]}
        onChange={(e) =>
          changeData({
            ...args,
            e: e,
          })
        }
      />
    );
  }

  // handle other inputs
  else {
    return (
      <input
        type="text"
        placeholder={placeholder}
        value={this_level_2[args.level_2_key][args.listIndexToChange]}
        onChange={(e) =>
          changeData({
            ...args,
            e: e,
          })
        }
      />
    );
  }
}

// ----------------------------------------------
// buttons
// ----------------------------------------------

// ************** level 0 **************

function get_level_0_deleteButton(args) {
  let btnLabel = args.level_0_key;

  //handle special
  if (args.level_0_key === "workExperience") btnLabel = "experience";

  return (
    <button
      className={`delete-${args.level_0_key}-button delete-in-level-0-button`}
      onClick={(e) =>
        changeData({
          ...args,
          e: e,
        })
      }
    >
      delete {btnLabel}
    </button>
  );
}

function get_level_0_addButton(args) {
  let btnLabel = args.level_0_key;

  //handle special
  if (args.level_0_key === "workExperience") btnLabel = "experience";

  return (
    <button
      className={`add-${args.level_0_key}-button`}
      onClick={(e) => {
        args.setFocusElmInfo({
          level_0_key: args.level_0_key,
          level_1_key: args.level_1_key,
          level_1_id: args.level_1_id,
          level_2_key: args.level_2_key,
          level_2_id: args.level_2_id,
        });
        changeData({
          ...args,
          e: e,
        });
      }}
    >
      add {btnLabel}
    </button>
  );
}

// ************** level 1 **************

function get_level_1_deleteButton(args) {
  // handle del job section
  if (args.level_1_key === "jobsInfo") {
    return (
      <button
        className={`delete-${args.level_1_key}-button delete-in-level-1-button`}
        onClick={() => changeData(args)}
      >
        {"delete job"}
      </button>
    );
  }

  // default
  else {
    return (
      <button
        className={`delete-${args.level_1_key}-button delete-in-level-1-button`}
        onClick={() => changeData(args)}
      >
        <div className="button-text">{"✖"}</div>
      </button>
    );
  }
}

function get_level_1_addButton(args) {
  let buttonText = args.level_1_key;
  switch (args.level_1_key) {
    case "awards":
      buttonText = "award";
      break;
    case "coursework":
      buttonText = "course";
      break;
    case "jobsInfo":
      buttonText = "job";
      break;
    case "hardSkillsTech":
      buttonText = "tech skill";
      break;
    case "hardSkillsOther":
      buttonText = "other skill";
      break;
    case "softSkills":
      buttonText = "soft skill";
      break;
    case "interests":
      buttonText = "interest";
      break;
  }

  return (
    <button
      className={`add-${args.level_1_key}-button`}
      onClick={() => {
        args.setFocusElmInfo({
          level_0_key: args.level_0_key,
          level_1_key: args.level_1_key,
          level_1_id: args.level_1_id,
          level_2_key: args.level_2_key,
          level_2_id: args.level_2_id,
        });
        changeData(args);
      }}
    >
      {"add " + buttonText}
    </button>
  );
}

// ************** level 2 **************

function get_level_2_deleteButton(args) {
  return (
    <button
      className={`delete-${args.level_1_key}-${args.level_2_key}-button`}
      onClick={() => changeData(args)}
    >
      {"✖"}
    </button>
  );
}

function get_level_2_addButton(args) {
  let buttonText = args.level_2_key;
  switch (args.level_2_key) {
    case "duties":
      buttonText = "duty";
      break;
    case "keyResults":
      buttonText = "key result";
      break;
  }

  return (
    <button
      className={`add-${args.level_1_key}-${args.level_2_key}-button`}
      onClick={() => {
        args.setFocusElmInfo({
          level_0_key: args.level_0_key,
          level_1_key: args.level_1_key,
          level_1_id: args.level_1_id,
          level_2_key: args.level_2_key,
          level_2_id: args.level_2_id,
        });
        changeData(args);
      }}
    >
      {"add " + buttonText}
    </button>
  );
}

// =======================================================================================
// util
// =======================================================================================

function get_this_level_1(args) {
  return args.userData[args.level_0_key].find(
    (this_level_1_map) => this_level_1_map.id === args.level_1_id
  );
}

function get_this_level_2(args, this_level_1) {
  return this_level_1[args.level_1_key].find(
    (this_level_2_map) => this_level_2_map.id === args.level_2_id
  );
}
