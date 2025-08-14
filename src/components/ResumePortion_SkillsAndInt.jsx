export default function ResumePortion_SkillsAndInt({ userData }) {
  return (
    <div className="ResumePortion_SkillsAndInt">
      <br />
      <h2>SKILLS & INTERESTS</h2>
      <hr />
      <ul>
        {Object.keys(userData.skillsAndInt).map((thisSkillOrInt) => {
          if (userData.skillsAndInt[thisSkillOrInt].length > 0) {
            return (
              <li key={thisSkillOrInt}>
                {getListTitle(thisSkillOrInt)}
                {semiColonList(userData.skillsAndInt[thisSkillOrInt])}
              </li>
            );
          } else return null;
        })}
      </ul>
    </div>
  );
}

function getListTitle(thisSkillOrInt) {
  switch (thisSkillOrInt) {
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

function semiColonList(list) {
  let formattedList = "";

  list.forEach((item, index) => {
    formattedList += item;
    if (index !== list.length - 1) {
      formattedList += "; ";
    }
  });

  return formattedList;
}
