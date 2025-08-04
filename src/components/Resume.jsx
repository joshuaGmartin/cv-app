export default function Resume() {
  return (
    <div className="Resume">
      Resume div
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
