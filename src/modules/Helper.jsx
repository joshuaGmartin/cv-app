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

  function handleFocusChange(focusElementInfo) {
    const parentFocusElm = document.getElementById(
      focusElementInfo.focusElm_id
    );

    let inputCollectionElm = parentFocusElm
      .querySelector(
        `.${focusElementInfo.focusElm_section}-input-list-${focusElementInfo.focusElm_list}`
      )
      .querySelector(".list-item-inputs");

    inputCollectionElm
      .querySelector("div:last-of-type")
      .querySelector("input")
      .focus();

    console.log(inputCollectionElm);

    return;
  }

  useEffect(() => {
    if (!focusElementInfo.focusElm_id) return;

    handleFocusChange(focusElementInfo);
  }, [focusElementInfo]);

  return setFocusElementInfo;
}
