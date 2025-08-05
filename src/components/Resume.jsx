import ResumePortionPersonal from "./ResumePortionPersonal";
import ResumePortionEducation from "./ResumePortionEducation";
import ResumePortionWorkExp from "./ResumePortionWorkExp";

export default function Resume({ userData }) {
  return (
    <div className="Resume">
      <ResumePortionPersonal userData={userData} />
      <ResumePortionEducation userData={userData} />
      <ResumePortionWorkExp userData={userData} />
    </div>
  );
}

function printResume() {
  const resumeElm = document.querySelector(".Resume");
  window.print();

  console.log(resumeElm);
}
