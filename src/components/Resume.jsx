import ResumePortionPersonal from "./ResumePortionPersonal";
import ResumePortionEducation from "./ResumePortionEducation";
import ResumePortionWorkExp from "./ResumePortionWorkExp";
import ResumePortionSkillsAndInt from "./ResumePortionSkillsAndInt";

export default function Resume({ userData }) {
  return (
    <div className="Resume">
      <ResumePortionPersonal userData={userData} />
      <ResumePortionEducation userData={userData} />
      <ResumePortionWorkExp userData={userData} />
      <ResumePortionSkillsAndInt userData={userData} />
      <br />
      <div id="references-line">
        <i>References available upon request</i>
      </div>
    </div>
  );
}

function printResume() {
  const resumeElm = document.querySelector(".Resume");
  window.print();

  console.log(resumeElm);
}
