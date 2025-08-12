import { GetDataInput } from "../modules/componentBuilder";

export default function InfoInput_Personal({ userData, setUserData }) {
  return (
    <div className="InfoInput_Personal">
      {Object.keys(userData.personal).map((key) => {
        return (
          <div key={key} className={`personal-input personal-input-${key}`}>
            {key === "portfolioLink" ? "https:// " : null}
            <GetDataInput
              userData={userData}
              setUserData={setUserData}
              level_0_key={"personal"}
              level_1_key={key}
            />
          </div>
        );
      })}
    </div>
  );
}
