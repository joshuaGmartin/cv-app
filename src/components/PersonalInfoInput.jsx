import userData from "../userData";

export default function PersonalInfoInput({ userData, setUserData }) {
  return (
    <div className="PersonalInfoInput">
      {Object.keys(userData.personal).map((key) => {
        return (
          <div key={key}>
            {key === "portfolioLink" ? "https:// " : null}
            <input
              type="text"
              placeholder={editValues(null, userData, key, "placeholder")}
              value={editValues(null, userData, key, "value")}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  personal: {
                    ...userData.personal,
                    [key]: editValues(e, userData, key, "onChange"),
                  },
                })
              }
            />
          </div>
        );
      })}
    </div>
  );
}

function editValues(e, userData, key, value) {
  if (value === "placeholder") {
    switch (key) {
      case "portfolioLink":
        return "portfolio link";
      default:
        return key;
    }
  }

  if (value === "value") {
    switch (key) {
      case "portfolioLink":
        return userData.personal[key].slice(8);
      default:
        return userData.personal[key];
    }
  }

  if (value === "onChange") {
    switch (key) {
      case "portfolioLink":
        return "https://" + e.target.value;
      default:
        return e.target.value;
    }
  }
}
