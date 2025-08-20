import {
  ResetDataButton,
  DemoDataButton,
  PrintButton,
} from "../modules/HeaderButtons";

export function Header({ setUserData }) {
  return (
    <div className="header">
      <h1 id="page-title">
        tomato<span>cv</span>
      </h1>
      <div className="header-buttons">
        <ResetDataButton setUserData={setUserData}></ResetDataButton>
        <DemoDataButton setUserData={setUserData}></DemoDataButton>
        <PrintButton></PrintButton>
        <button
          id="gitHub-repo-link"
          onClick={() =>
            window.open(
              "https://github.com/joshuaGmartin/cv-app",
              "_blank",
              "noopener,noreferrer"
            )
          }
        >
          source
        </button>
      </div>
    </div>
  );
}
