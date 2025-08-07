import { useState, useEffect } from "react";

export function FocusHandler() {
  const [focusElementInfo, setFocusElementInfo] = useState({
    focusElmId: null,
    focusElmType: null,
  });

  function handleFocusChange(focusElementInfo) {
    const parentFocusElm = document.getElementById(focusElementInfo.focusElmId);
    let inputCollectionElm;

    if (focusElementInfo.focusElmType === "award") {
      inputCollectionElm = parentFocusElm.querySelector(".awards-input");
    }
    if (focusElementInfo.focusElmType === "course") {
      inputCollectionElm = parentFocusElm.querySelector(".coursework-input");
    }

    inputCollectionElm
      .querySelector("div:last-of-type")
      .querySelector("input")
      .focus();

    return;
  }

  useEffect(() => {
    if (!focusElementInfo.focusElmId || !focusElementInfo.focusElmType) return;

    handleFocusChange(focusElementInfo);
  }, [focusElementInfo]);

  return setFocusElementInfo;
}
