import ResumePortion_Personal from "./ResumePortion_Personal";
import ResumePortion_Education from "./ResumePortion_Education";
import ResumePortion_WorkExp from "./ResumePortion_WorkExp";
import ResumePortion_SkillsAndInt from "./ResumePortion_SkillsAndInt";

export default function Resume({ userData }) {
  return (
    <div className="Resume">
      <ResumePortion_Personal userData={userData} />
      <ResumePortion_Education userData={userData} />
      <ResumePortion_WorkExp userData={userData} />
      <ResumePortion_SkillsAndInt userData={userData} />
      <br />
      <div id="references-line">
        <i>References available upon request</i>
      </div>
    </div>
  );
}

// add later?
function printResume() {
  const resumeElm = document.querySelector(".Resume");
  window.print();
}
