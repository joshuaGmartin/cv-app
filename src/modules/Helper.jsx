import { useState, useEffect } from "react";

/* 
template:

args.setFocusElmInfo({
    level_0_key: args.level_0_key,
    level_1_key: args.level_1_key,
    level_1_id: args.level_1_id,
    level_2_key: args.level_2_key,
    level_2_id: args.level_2_id,
  })

*/

export function FocusHandler() {
  const [focusElmInfo, setFocusElmInfo] = useState({
    level_0_key: null,
    level_1_key: null,
    level_1_id: null,
    level_2_key: null,
    level_2_id: null,
  });

  useEffect(() => {
    let focusElm;

    if (!focusElmInfo.level_0_key) return; // init

    switch (focusElmInfo.level_0_key) {
      case "personal":
        return; // no focus here
      case "education":
        if (focusElmInfo.level_1_key === "includeGPA") {
          focusElm = getFocusElm_gpaInput(focusElmInfo);
        } else if (focusElmInfo.level_1_key) {
          focusElm = getFocusElm_in_level_1_list(focusElmInfo);
        } else {
          focusElm = getFocusElm_in_level_1_section(focusElmInfo);
        }
        break;
      case "workExperience":
        if (focusElmInfo.level_2_key) {
          focusElm = getFocusElm_in_level_2_list(focusElmInfo);
        } else if (focusElmInfo.level_1_key) {
          focusElm = getFocusElm_in_level_2_section(focusElmInfo);
        } else {
          focusElm = getFocusElm_in_level_1_section(focusElmInfo);
        }
        break;
      case "skillsAndInt":
        focusElm = getFocusElm_in_level_0_list(focusElmInfo);
        break;
      default:
        console.error(
          focusElmInfo.level_0_key +
            " does not exist in data base as top level key"
        );
        return;
    }

    focusElm.focus();
  }, [focusElmInfo]);

  return setFocusElmInfo;
}

// =======================================================================================
// helper functions
// =======================================================================================

// ************** level 0 **************

function getFocusElm_in_level_0_list(focusElmInfo) {
  const parentFocusElm = document.getElementById(
    `${focusElmInfo.level_0_key}-${focusElmInfo.level_1_key}-section`
  );

  let inputCollectionElm = parentFocusElm.querySelector(".list-item-inputs");

  let focusElm = inputCollectionElm.querySelector(
    ".list-input-and-del-btn:last-of-type"
  ).firstElementChild;

  return focusElm;
}

// ************** level 1 **************

function getFocusElm_in_level_1_list(focusElmInfo) {
  const parentFocusElm = document.getElementById(focusElmInfo.level_1_id);

  let inputCollectionElm = parentFocusElm
    .querySelector(
      `.${focusElmInfo.level_0_key}-input-list-${focusElmInfo.level_1_key}`
    )
    .querySelector(".list-item-inputs");

  let focusElm = inputCollectionElm.querySelector(
    ".list-input-and-del-btn:last-of-type"
  ).firstElementChild;

  return focusElm;
}

function getFocusElm_in_level_1_section(focusElmInfo) {
  let sectionClassPreFix = focusElmInfo.level_0_key;

  if (sectionClassPreFix === "workExperience") sectionClassPreFix = "work-exp";

  const parentFocusElm = document.querySelector(
    `.${sectionClassPreFix}-section:last-of-type`
  );

  let focusElm = parentFocusElm.querySelector("input");

  return focusElm;
}

// ************** level 2 **************

function getFocusElm_in_level_2_list(focusElmInfo) {
  // jank: the class name are a little arbitrary.

  const parentFocusElm = document.getElementById(focusElmInfo.level_2_id);
  const childFocusElm = parentFocusElm.querySelector(
    `.${focusElmInfo.level_1_key}-input-list-${focusElmInfo.level_2_key}`
  );

  let inputCollectionElm = childFocusElm.querySelector(".list-item-inputs");

  let focusElm = inputCollectionElm.querySelector(
    `.${focusElmInfo.level_2_key}-list-item:last-of-type`
  ).firstElementChild;

  return focusElm;
}

function getFocusElm_in_level_2_section(focusElmInfo) {
  let sectionClassPreFix = focusElmInfo.level_0_key;

  //handle special
  if (sectionClassPreFix === "workExperience")
    sectionClassPreFix = "work-exp-job";

  const parentFocusElm = document.getElementById(focusElmInfo.level_1_id);

  const childFocusElm = parentFocusElm.querySelector(
    `.${sectionClassPreFix}-section:last-of-type`
  );

  let focusElm = childFocusElm.querySelector("input");

  return focusElm;
}

// ************** special **************

function getFocusElm_gpaInput(focusElmInfo) {
  const parentFocusElm = document
    .getElementById(focusElmInfo.level_1_id)
    .querySelector(".gpa-inputs");

  let focusElm = parentFocusElm.querySelector(":nth-child(2)");

  // if gpa input no exist (changed to no check)
  if (!focusElm) {
    // focus on checkbox
    focusElm = document.getElementById(focusElmInfo.level_1_id + "-includeGPA");
  }

  return focusElm;
}
