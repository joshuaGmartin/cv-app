export default function Resume({ userData }) {
  return (
    <div className="Resume">
      {JSON.stringify(userData)}
      <div className="wrapper">
        <button onClick={clickAlert}>Print</button>
      </div>
    </div>
  );
}

function clickAlert() {
  const resumeElm = document.querySelector(".Resume");
  window.print();

  console.log(resumeElm);
}
