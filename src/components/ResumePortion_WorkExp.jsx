export default function ResumePortion_WorkExp({ userData }) {
  return (
    <div className="ResumePortion_WorkExp">
      <br />
      <h2>RELEVANT WORK EXPERIENCE</h2>
      <hr />

      {userData.workExperience.map((thisWork, index) => {
        return (
          <div key={thisWork.id}>
            {index !== 0 ? <br /> : null}
            <div className="workExp-top-line">
              <h3>{thisWork.employer}</h3>
              <b>
                {thisWork.totalTimeStart} – {thisWork.totalTimeEnd}{" "}
              </b>
            </div>

            {thisWork.jobsInfo.map((thisJob, index) => {
              return (
                <div key={thisJob.id}>
                  {index !== 0 ? <br /> : null}
                  <div className="workExp-job-title-line">
                    <i>
                      {thisJob.position}
                      {thisWork.jobsInfo.length > 1 ? (
                        <>
                          {" | "}
                          {thisJob.timeStart} – {thisJob.timeEnd}
                        </>
                      ) : null}
                    </i>
                    <i>{thisJob.location}</i>
                  </div>

                  <ul>
                    {thisJob.duties.length > 0
                      ? thisJob.duties.map((duty) => {
                          return <li key={duty}>{duty}</li>;
                        })
                      : null}
                    {thisJob.stack.length > 0 ? (
                      <li>
                        <b>Stack: </b>
                        {semiColonList(thisJob.stack)}
                      </li>
                    ) : null}
                    {thisJob.keyResults.length > 0
                      ? thisJob.keyResults.map((keyResult) => {
                          return (
                            <li key={keyResult}>
                              <b>Key Results: </b>
                              {keyResult}
                            </li>
                          );
                        })
                      : null}
                  </ul>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
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
