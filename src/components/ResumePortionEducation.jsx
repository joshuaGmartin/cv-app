export default function ResumePortionEducation({ userData }) {
  return (
    <div className="ResumePortionEducation">
      <br />
      <h2>EDUCATION</h2>
      <hr />

      {userData.education.map((thisEd, index) => {
        return (
          <div
            className="education-section"
            key={thisEd.school + thisEd.gradYear}
          >
            {index !== 0 ? <br /> : null}
            <div className="education-top-line">
              <h3>{thisEd.school}</h3>
              <b>
                Graduation {thisEd.gradYear}
                {thisEd.currentStudent ? "(expected)" : null}
              </b>
            </div>

            <div className="education-second-line">
              <i>
                {thisEd.degree}, {thisEd.major} (
                {thisEd.minor !== ""
                  ? thisEd.minor + " minor"
                  : thisEd.specialization + " specialization"}
                )
              </i>
              <i>{thisEd.location}</i>
            </div>
            <EducationListSection thisEd={thisEd} />
          </div>
        );
      })}
    </div>
  );
}

function EducationListSection({ thisEd }) {
  let edList = null;
  let edGPA = null;
  let edAwards = null;
  let edCourses = null;
  let edGPAplusAwards = null;

  if (thisEd.gpa || thisEd.awards.length > 0 || thisEd.coursework.length > 0) {
    if (thisEd.gpa) {
      edGPA = (
        <b>
          GPA: {thisEd.gpa}/{thisEd.gpaScale}
          {thisEd.awards.length > 0 ? "; " : null}
        </b>
      );
    }

    if (thisEd.awards.length > 0) {
      edAwards = "";

      thisEd.awards.forEach((award, index) => {
        edAwards += award;
        if (index !== thisEd.awards.length - 1) {
          edAwards += "; ";
        }
      });
    }

    if (thisEd.coursework.length > 0) {
      edCourses = "";

      thisEd.coursework.forEach((course, index) => {
        edCourses += course;
        if (index !== thisEd.coursework.length - 1) {
          edCourses += "; ";
        }
      });
    }

    // if no gpa or awards, line is null (see edList below for null test in render)
    if (edGPA || edAwards) {
      edGPAplusAwards = (
        <>
          {edGPA}
          {edAwards}
        </>
      );
    }

    edList = (
      <ul>
        {edGPAplusAwards ? <li>{edGPAplusAwards}</li> : null}
        {edCourses ? (
          <li>
            <b>Coursework: </b>
            {edCourses}
          </li>
        ) : null}
      </ul>
    );
  }

  return edList;
}
