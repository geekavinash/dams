export default function LinkButton({ title, onClick = () => null }) {
  return (
    <div
      onClick={onClick}
      style={{ padding: 10, border: "1px solid black", cursor: "pointer" }}
    >
      <span style={{ color: "white" }}>{title}</span>
    </div>
  );
}
