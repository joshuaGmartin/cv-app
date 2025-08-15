import { joshData, resetData } from "./userData";

export function ResetDataButton({ setUserData }) {
  return <button onClick={() => setUserData(resetData)}>reset</button>;
}

export function DemoDataButton({ setUserData }) {
  return <button onClick={() => setUserData(joshData)}>demo</button>;
}
