export default function ResumePortionPersonal({ userData }) {
  return (
    <div className="ResumePortionPersonal">
      <h1>{userData.personal.fullname}</h1>
      {userData.personal.email} | {userData.personal.phone} |{" "}
      {userData.personal.location} |{" "}
      <a href={userData.personal.gitHub}>GitHub</a>
      <hr />
    </div>
  );
}
