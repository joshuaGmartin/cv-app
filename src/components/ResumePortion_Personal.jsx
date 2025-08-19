export default function ResumePortion_Personal({ userData }) {
  return (
    <div className="ResumePortion_Personal">
      <h1>{userData.personal.fullname}</h1>
      {userData.personal.email} | {userData.personal.phone} |{" "}
      {userData.personal.location} |{" "}
      <a
        href={userData.personal.portfolioLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        {userData.personal.portfolioName}
      </a>
      <hr />
    </div>
  );
}
