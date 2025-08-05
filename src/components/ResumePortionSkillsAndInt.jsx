export default function ResumePortionSkillsAndInt({ userData }) {
  return (
    <div className="ResumePortionSkillsAndInt">
      <br />
      <h2>SKILLS & INTERESTS</h2>
      <hr />
      <ul>
        {Object.keys(userData.skillsAndInt).map((thisSkillorInt) => {
          if (userData.skillsAndInt[thisSkillorInt].length > 0) {
            return (
              <>
                <li>
                  {getListTitle(thisSkillorInt)}
                  {SemiColonList(userData.skillsAndInt[thisSkillorInt])}
                </li>
              </>
            );
          }
        })}
      </ul>
    </div>
  );
}

function getListTitle(thisSkillorInt) {
  switch (thisSkillorInt) {
    case "hardSkillsTech":
      return <b>Hard Skills (Tech): </b>;
    case "hardSkillsOther":
      return <b>Hard Skills (Other): </b>;
    case "softSkills":
      return <b>Soft Skills: </b>;
    case "interests":
      return <b>Interests: </b>;
  }
}

function SemiColonList(list) {
  let formattedList = "";

  list.forEach((item, index) => {
    formattedList += item;
    if (index !== list.length - 1) {
      formattedList += "; ";
    }
  });

  return formattedList;
}
