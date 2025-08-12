export default function ResumePortion_Education({ userData }) {
  return (
    <div className="ResumePortion_Education">
      <br />
      <h2>EDUCATION</h2>
      <hr />

      {userData.education.map((thisEd, index) => {
        return (
          <div className="education-section" key={thisEd.id}>
            {index !== 0 ? <br /> : null}
            <div className="education-top-line">
              <h3>{thisEd.school}</h3>
              <b>
                Graduation {thisEd.gradYear}
                {thisEd.currentStudent ? " (expected)" : null}
              </b>
            </div>

            <div className="education-second-line">
              <i>
                {thisEd.degree}, {thisEd.major}
                {getminorOrConcLine(thisEd)}
              </i>
              <i>{thisEd.location}</i>
            </div>
            {educationListSection(thisEd)}
          </div>
        );
      })}
    </div>
  );
}

function getminorOrConcLine(thisEd) {
  if (thisEd.minor === "" || thisEd.concentration === "") {
    return null;
  } else {
    return (
      <>
        {" "}
        (
        {thisEd.minor !== null
          ? thisEd.minor + " minor"
          : thisEd.concentration + " concentration"}
        )
      </>
    );
  }
}

function educationListSection(thisEd) {
  let edList = null;
  let edGPA = null;
  let edAwards = null;
  let edCourses = null;
  let edGPAplusAwards = null;

  if (thisEd.gpa || thisEd.awards.length > 0 || thisEd.coursework.length > 0) {
    if (thisEd.gpa || thisEd.gpa === "") {
      edGPA = (
        <b>
          GPA: {thisEd.gpa}/{thisEd.gpaScale}
          {thisEd.awards.length > 0 ? "; " : null}
        </b>
      );
    }

    if (thisEd.awards.length > 0) {
      let awardsString = "";

      thisEd.awards.forEach((award, index) => {
        awardsString += award;
        if (index !== thisEd.awards.length - 1) {
          awardsString += "; ";
        }
      });

      edAwards = (
        <>
          {!thisEd.gpa ? <b>Awards: </b> : null}
          {awardsString}
        </>
      );
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
