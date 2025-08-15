import { ResetDataButton, DemoDataButton } from "../modules/HeaderButtons";

export function Header({ setUserData }) {
  return (
    <div className="header">
      <h1 id="page-title">
        tomato<span>cv</span>
      </h1>
      <div className="header-buttons">
        <ResetDataButton setUserData={setUserData}></ResetDataButton>
        <DemoDataButton setUserData={setUserData}></DemoDataButton>
      </div>
    </div>
  );
}
