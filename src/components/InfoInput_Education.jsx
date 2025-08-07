import * as componentBuilder from "../modules/componentBuilder.jsx";
import { FocusHandler } from "../modules/Helper.jsx";

export default function InfoInput_Education({
  userData,
  setUserData,
  resetData,
}) {
  const setFocusElementInfo = FocusHandler();

  return (
    <div className="InfoInput_Education">
      {userData.education.map((thisEd) => {
        return (
          <div key={thisEd.id} className="education-section" id={thisEd.id}>
            {getEducationInputs(
              thisEd,
              userData,
              setUserData,
              setFocusElementInfo
            )}
            <button
              className="delete-education-button"
              onClick={() =>
                setUserData({
                  ...userData,
                  education: userData.education.filter(
                    (filterEd) => filterEd.id !== thisEd.id
                  ),
                })
              }
            >
              xxxxxxxxxxxxx
            </button>
          </div>
        );
      })}

      {/* add education button */}
      <button
        className="add-education-button"
        onClick={() =>
          setUserData({
            ...userData,
            education: [
              ...userData.education,
              {
                ...resetData.education[0],
                id: crypto.randomUUID(),
              },
            ],
          })
        }
      >
        ++++++++++++
      </button>
    </div>
  );
}

function getEducationInputs(
  thisEd,
  userData,
  setUserData,
  setFocusElementInfo
) {
  return (
    <div className="education-inputs">
      {getEducationInputs_topLine(thisEd, userData, setUserData)}
      {getEducationInputs_listInputs(
        thisEd,
        userData,
        setUserData,
        setFocusElementInfo
      )}
    </div>
  );
}

function getEducationInputs_topLine(thisEd, userData, setUserData) {
  return (
    <div className="education-top-lines-inputs">
      {componentBuilder.getTextInput(
        thisEd,
        "school",
        userData,
        setUserData,
        thisEd.school + thisEd.gradYear + "school-input"
      )}

      <div className="grad-year-line">
        {componentBuilder.getTextInput(
          thisEd,
          "gradYear",
          userData,
          setUserData,
          thisEd.school + thisEd.gradYear + "gradYear-input"
        )}
        {componentBuilder.getCheckBoxInput(
          thisEd,
          "currentStudent",
          userData,
          setUserData,
          thisEd.school + thisEd.gradYear + "currentStudent-input"
        )}
      </div>

      {componentBuilder.getTextInput(
        thisEd,
        "location",
        userData,
        setUserData,
        thisEd.school + thisEd.gradYear + "location-input"
      )}
      {componentBuilder.getTextInput(
        thisEd,
        "degree",
        userData,
        setUserData,
        thisEd.school + thisEd.gradYear + "degree-input"
      )}

      <div className="minOrSpec-line">
        {componentBuilder.getTextInput(
          thisEd,
          "minorOrSpec",
          userData,
          setUserData,
          thisEd.school + thisEd.gradYear + "minorOrSpec-input"
        )}
        {componentBuilder.getRadioInput(
          thisEd,
          "minor",
          userData,
          setUserData,
          thisEd.school + thisEd.gradYear + "minor-input"
        )}{" "}
        {componentBuilder.getRadioInput(
          thisEd,
          "specialization",
          userData,
          setUserData,
          thisEd.school + thisEd.gradYear + "specialization-input"
        )}
      </div>
    </div>
  );
}

function getEducationInputs_listInputs(
  thisEd,
  userData,
  setUserData,
  setFocusElementInfo
) {
  return (
    <div className="education-list-inputs">
      {getEducationInputs_gpaInputs(thisEd, userData, setUserData)}
      {getEducationInputs_listItemInput(
        thisEd,
        userData,
        setUserData,
        "award",
        setFocusElementInfo
      )}
      {getEducationInputs_listItemInput(
        thisEd,
        userData,
        setUserData,
        "course",
        setFocusElementInfo
      )}
    </div>
  );
}

function getEducationInputs_gpaInputs(thisEd, userData, setUserData) {
  return (
    <div className="gpa-inputs">
      {componentBuilder.getCheckBoxInput(
        thisEd,
        "gpa",
        userData,
        setUserData,
        thisEd.school + thisEd.gradYear + "includeGPA-input"
      )}
      {thisEd.gpa || thisEd.gpa === ""
        ? componentBuilder.getTextInput(
            thisEd,
            "gpa",
            userData,
            setUserData,
            thisEd.school + thisEd.gradYear + "gpa-input"
          )
        : null}
      {thisEd.gpa || thisEd.gpa === ""
        ? componentBuilder.getTextInput(
            thisEd,
            "gpaScale",
            userData,
            setUserData,
            thisEd.school + thisEd.gradYear + "gpaScale-input"
          )
        : null}
    </div>
  );
}

function getEducationInputs_listItemInput(
  thisEd,
  userData,
  setUserData,
  listItemtype,
  setFocusElementInfo
) {
  let key;

  switch (listItemtype) {
    case "award":
      key = "awards";
      break;
    case "course":
      key = "coursework";
      break;
  }

  return (
    <>
      <div className={`${key}-input`}>
        {key}:
        {thisEd[key].map((listItem, index) => {
          return (
            <div key={index}>
              {componentBuilder.getListItemInput(
                thisEd,
                userData,
                setUserData,
                thisEd.school + thisEd.gradYear + listItemtype + "input",
                listItem,
                index,
                listItemtype
              )}

              {/* delete listItem button */}
              <button
                className={`delete-${listItemtype}-button`}
                onClick={() =>
                  setUserData({
                    ...userData,
                    education: userData.education.map((mapEd) => {
                      if (mapEd.id === thisEd.id) {
                        return {
                          ...mapEd,
                          [key]: mapEd[key].filter(
                            (listItem, filterIndex) => index !== filterIndex
                          ),
                        };
                      } else return mapEd;
                    }),
                  })
                }
              >
                -X-
              </button>
            </div>
          );
        })}
        {/* add item button */}
        <button
          className={`add-${listItemtype}-button`}
          onClick={() =>
            handleAddListItemButtonClick(
              thisEd,
              userData,
              setUserData,
              setFocusElementInfo,
              listItemtype,
              key
            )
          }
        >
          add {listItemtype}
        </button>
      </div>
    </>
  );
}

// need add focus handler in App root?
function handleAddListItemButtonClick(
  thisEd,
  userData,
  setUserData,
  setFocusElementInfo,
  listItemtype,
  key
) {
  setFocusElementInfo({
    focusElmId: thisEd.id,
    focusElmType: listItemtype,
  });

  setUserData({
    ...userData,
    education: userData.education.map((mapEd) => {
      if (mapEd.id === thisEd.id) {
        return {
          ...mapEd,
          [key]: [...mapEd[key], ""],
        };
      } else return mapEd;
    }),
  });

  return;
}
