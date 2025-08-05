import ResumePortionPersonal from "./ResumePortionPersonal";
import ResumePortionEducation from "./ResumePortionEducation";

export default function Resume({ userData }) {
  return (
    <div className="Resume">
      <ResumePortionPersonal userData={userData} />
      <hr />
      <ResumePortionEducation userData={userData} />
    </div>
  );
}

function printResume() {
  const resumeElm = document.querySelector(".Resume");
  window.print();

  console.log(resumeElm);
}
