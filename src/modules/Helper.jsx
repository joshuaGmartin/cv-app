import { useState, useEffect } from "react";

/* 
template:

setFocusElementInfo({
    focusElm_id:"",
    focusElm_section:"",
    focusElm_list:"",
  })

*/

export function FocusHandler() {
  const [focusElementInfo, setFocusElementInfo] = useState({
    focusElm_id: null,
    focusElm_section: null,
    focusElm_list: null,
  });

  // this could stand to be refactored into level_0, 1, 2
  function handleFocusChange(focusElementInfo) {
    // add section focus functionality later
    if (focusElementInfo.focusElm_list === "jobsInfo") return;

    const parentFocusElm = document.getElementById(
      focusElementInfo.focusElm_id
    );

    console.log(focusElementInfo.focusElm_id);

    let inputCollectionElm = parentFocusElm
      .querySelector(
        `.${focusElementInfo.focusElm_section}-input-list-${focusElementInfo.focusElm_list}`
      )
      .querySelector(".list-item-inputs");

    inputCollectionElm
      .querySelector("div:last-of-type")
      .firstElementChild.focus();

    console.log(inputCollectionElm);

    return;
  }

  useEffect(() => {
    if (!focusElementInfo.focusElm_id) return;

    handleFocusChange(focusElementInfo);
  }, [focusElementInfo]);

  return setFocusElementInfo;
}
