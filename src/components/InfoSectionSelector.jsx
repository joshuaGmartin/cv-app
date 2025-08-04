export default function InfoSectionSelector({ value, onClick }) {
  return (
    <div className="InfoSectionSelector" onClick={onClick}>
      {value}
    </div>
  );
}
